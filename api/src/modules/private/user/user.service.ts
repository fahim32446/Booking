import { Request } from 'express';
import AbstractServices from '../../../abstract/abstract.service';
import CustomError from '../../../utils/error/customError';
import Stripe from 'stripe';
import config from '../../../utils/config';
import { ICreateBooking } from '../booking/booking.type';

export class userService extends AbstractServices {
  private stripe = new Stripe(config.STRIPE_API_KEY);

  constructor() {
    super();
  }

  public async checkUser(req: Request) {
    return await this.models.db.transaction(async (trx) => {
      const user_conn = this.models.userModal(req);

      const { id } = req.params as { id: string };

      const loginUser = req.userId;

      const res = await user_conn.checkUser(loginUser);

      return {
        success: true,
        data: res,
        message: 'User details',
      };
    });
  }

  public async bookingPayment(req: Request) {
    return await this.models.db.transaction(async (trx) => {
      const { numberOfNights } = req.body;
      const { hotelId } = req.params as { hotelId: string };

      const hotel_conn = this.models.HotelModel(req);

      const hotel = await hotel_conn.hotelDetails(hotelId);

      const totalCost = hotel.pricePerNight * numberOfNights;

      if (!hotel) {
        throw new CustomError('No hotel found', 400, 'NOT_FOUND');
      }

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: 'usd',
        metadata: {
          hotelId,
          userId: req.userId,
        },
      });

      if (!paymentIntent.client_secret) {
        throw new CustomError('Error creating payment intent', 500, 'ERROR');
      }

      const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost,
      };

      return {
        success: true,
        data: response,
        message: 'Payment details',
      };
    });
  }

  public async bookingConfirm(req: Request) {
    return await this.models.db.transaction(async (trx) => {
      const body = req.body as ICreateBooking & { paymentIntentId: string };

      const booking_conn = this.models.BookingModal(req);

      const paymentIntentId = body.paymentIntentId;

      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        throw new CustomError('Error creating payment intent', 500, 'ERROR');
      }

      if (
        paymentIntent.metadata.hotelId != req.params.hotelId ||
        paymentIntent.metadata.userId != req.userId
      ) {
        throw new CustomError('Payment intent mismatch', 500, 'ERROR');
      }

      if (paymentIntent.status !== 'succeeded') {
        throw new CustomError(
          'Payment not succeeded',
          Number(paymentIntent.status || 500),
          'ERROR'
        );
      }

      const createBooking: ICreateBooking = {
        adult_count: body.adult_count,
        check_in: body.check_in,
        check_out: body.check_out,
        child_count: body.child_count,
        hotel_id: body.hotel_id,
        total_cost: body.total_cost,
        user_id: Number(req.userId),
      };

      const res = await booking_conn.bookHotel(createBooking);

      return {
        success: true,
        data: res,
        message: 'Hotel booking is successfully done',
      };
    });
  }
}
