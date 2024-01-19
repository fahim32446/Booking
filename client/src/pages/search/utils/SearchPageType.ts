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
