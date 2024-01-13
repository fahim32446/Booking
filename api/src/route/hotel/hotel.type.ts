export interface IHotelType {
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: IBookingType[];
}

export interface IBookingType {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
}

export interface IHotelSearchResponse {
  data: IHotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export type HotelData = {
  user_id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adult_count: number;
  child_count: number;
  price_per_night: number;
  star_rating: number;
  image_urls: string;
  facilities: string;
};
