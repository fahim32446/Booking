export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration extends ILogin {
  first_name: string;
  last_name: string;
}
