export interface IHotelSearchType {
  name?: string;
  city?: string;
  country?: string;
  type?: string;
  adult_count?: number;
  child_count?: number;
  price_per_night?: number;
  star_rating?: number[];
  facilities?: string;
  sort_by?: string;
}
