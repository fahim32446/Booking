export interface IHotelSearchType {
  name?: string;
  city?: string;
  country?: string;
  type?: string;
  adult_count?: number;
  child_count?: number;
  price_per_night?: number;
  star_rating?: string[] | string | number | number[];
  facilities?: string;
  checkIn?: string | Date;
  checkOut?: string | Date;
  page: number;
}
