import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import AbstractServices from '../../../abstract/abstract.service';
import CustomError from '../../../utils/error/customError';
import { ILogin, IRegistration } from './auth.type';

import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { IDecoded } from '../../../common/type';
import config from '../../../utils/config';

class AuthService extends AbstractServices {
  constructor() {
    super();
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;

    return await this.models.db.transaction(async (trx) => {
      const auth_conn = this.models.authModel(req);

      const user = await auth_conn.login(email);

      const userIsExist = await auth_conn.checkExistingEmail(email);

      if (!userIsExist) {
        throw new CustomError('No user exist with this email', 400, 'Error');
      }

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordMatch) {
        throw new CustomError('Wrong password', 400, 'Error');
      }

      const token = jwt.sign(
        { userId: user.user_id },
        config.JWT_SECRET as string,
        {
          expiresIn: '1d',
        }
      );

      res.cookie(config.COOKIES_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });

      const { password, ...others } = user;

      return {
        success: true,
        data: { ...others, token },
        message: 'User login successfully done',
      };
    });
  }

  public async signGoogle(req: Request, res: Response) {
    const { email, first_name, last_name } = req.body as IRegistration;

    return await this.models.db.transaction(async (trx) => {
      const auth_conn = this.models.authModel(req);

      const userIsExist = await auth_conn.checkExistingEmail(email);

      let user;

      if (userIsExist) {
        user = await auth_conn.login(email);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);

        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        const newUserInfo: IRegistration = {
          email: email,
          password: hashedPassword,
          first_name: first_name,
          last_name: last_name,
        };

        user = await auth_conn.signUp(newUserInfo);
      }

      const token = jwt.sign(
        { userId: user?.user_id },
        config.JWT_SECRET as string,
        {
          expiresIn: '1d',
        }
      );

      res.cookie(config.COOKIES_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });

      user = {
        user_id: user.user_id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        name: first_name + ' ' + last_name,
        token,
      };

      return {
        success: true,
        data: user,
        message: 'User login successfully done',
      };
    });
  }

  public async signUp(req: Request, res: Response) {
    const { email, password, first_name, last_name } =
      req.body as IRegistration;

    return await this.models.db.transaction(async (trx) => {
      const auth_conn = this.models.authModel(req);

      const checkAlreadyExist = await auth_conn.checkExistingEmail(email);

      if (checkAlreadyExist?.user_id) {
        throw new CustomError('Email already exists', 409, 'Conflict');
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUserInfo: IRegistration = {
        email: email,
        password: hashedPassword,
        first_name: first_name,
        last_name: last_name,
      };

      const user = await auth_conn.signUp(newUserInfo);

      const token = jwt.sign(
        { userId: user.user_id },
        config.JWT_SECRET as string,
        {
          expiresIn: '1d',
        }
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });

      const { password, ...others } = newUserInfo;

      return {
        success: true,
        data: {
          user_id: user.user_id,
          ...others,
          name: first_name + ' ' + last_name,
          token,
        },
        message: 'User registration successfully done',
      };
    });
  }

  public async signOut(req: Request, res: Response) {
    res.clearCookie(config.COOKIES_NAME);

    return {
      success: true,
      message: 'User sign out successfully done',
    };
  }

  public async forgotPassword(req: Request, res: Response) {
    const { email } = req.body as { email: string };

    return await this.models.db.transaction(async (trx) => {
      const auth_conn = this.models.authModel(req);

      const checkAlreadyExist = await auth_conn.checkExistingEmail(email);

      if (!checkAlreadyExist.user_id) {
        throw new CustomError('No account found with this email', 400, 'Error');
      }

      const resetOTP = Math.floor(100000 + Math.random() * 900000);

      const OTPExpired = Date.now() + 3600000; // Token expiry in 1 hour

      const user_id = checkAlreadyExist.user_id;
      auth_conn.updateToken(user_id, resetOTP, OTPExpired);

      const transporter = nodemailer.createTransport({
        //@ts-ignore
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
          user: config.SENDER_EMAIL,
          pass: config.SENDER_EMAIL_APP_PASS,
        },
      });

      const mailOptions = {
        from: config.SENDER_EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `Please provide this code for reset your password : ${resetOTP}`,
      };

      await transporter.sendMail(mailOptions);

      return {
        success: true,
        message: 'OTP send in your email, please check it',
      };
    });
  }

  public async verifyOTP(req: Request, res: Response) {
    const { email, otp } = req.body as { email: string; otp: string };

    return await this.models.db.transaction(async (trx) => {
      const auth_conn = this.models.authModel(req);

      const checkAlreadyExist = await auth_conn.checkExistingEmail(email);

      if (!checkAlreadyExist.user_id) {
        throw new CustomError('No account found with this email', 400, 'Error');
      }

      const user_id = checkAlreadyExist.user_id;
      const res = await auth_conn.getToken(email, user_id);

      if (!(Number(res.otp) === Number(otp) && res.otp_expired > Date.now())) {
        throw new CustomError('This OTP has Expired', 400, 'Error');
      }

      const token = jwt.sign({ userId: user_id }, config.JWT_SECRET as string, {
        expiresIn: '1h',
      });

      return {
        success: true,
        message: 'your OTP is verified',
        data: token,
      };
    });
  }

  public async resetPassword(req: Request, res: Response) {
    const { email, token, password } = req.body as {
      email: string;
      token: string;
      password: string;
    };

    return await this.models.db.transaction(async (trx) => {
      const auth_conn = this.models.authModel(req);

      if (!req.body.token) {
        throw new CustomError(
          'Unauthorized action or otp expired',
          401,
          'Error'
        );
      }

      const decoded = jwt.verify(req.body.token, config.JWT_SECRET) as IDecoded;

      const user_id = decoded.userId;

      if (!decoded || !user_id) {
        throw new CustomError(
          'Unauthorized action or otp expired',
          401,
          'Error'
        );
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await auth_conn.updatePassword(user_id, hashedPassword);

      return {
        success: true,
        message: 'Your password change successfully done',
      };
    });
  }
}

export default AuthService;
