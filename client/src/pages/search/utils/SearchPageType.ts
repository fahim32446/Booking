export interface IHotelSearchType {
  name?: string;
  city?: string;
  country?: string;
  type?: string | string[];
  adult_count?: number;
  child_count?: number;
  price_per_night?: number | null;
  star_rating?: string[] | string | number | number[];
  facilities?: string | string[];
  checkIn?: string | Date;
  checkOut?: string | Date;
  page: number;
  sort_by?: string;
}

export interface IPaymentType {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
}

export interface IPaymentBody {
  hotelId: number | string;
  numberOfNights: number | string;
}

export interface IConfirmBooking {
  adult_count: number;
  child_count: number;
  check_in: string;
  check_out: string;
  user_id?: number;
  total_cost: string;
  hotel_id: number;
  paymentIntentId: string;
}

export interface IMyBookingList {
  check_in: string;
  check_out: string;
  total_cost: string;
  hotel_id: number;
  email: string;
  first_name: string;
  hotelName: string;
  city: string;
  country: string;
  description: string;
  type: string;
  price_per_night: string;
  star_rating: number;
  image_urls: string;
  adultCount: string;
  childCount: string;
}
