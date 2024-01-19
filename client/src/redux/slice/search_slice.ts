import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type SearchState = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;
  stars?: string[];
  type?: string[];
  facility?: string[];
  price?: number | undefined | null;
};

const initialState: SearchState = {
  destination: '',
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 1,
  hotelId: '',
  stars: [],
  type: [],
  facility: [],
  price: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    saveSearchValues: (
      state,
      action: PayloadAction<{
        destination: string;
        checkIn: Date;
        checkOut: Date;
        adultCount: number;
        childCount: number;
        hotelId?: string;
        stars?: string[];
        type?: string[];
        facility?: string[];
        price?: number | undefined | null;
      }>
    ) => {
      const {
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        stars,
        type,
        facility,
        price,
      } = action.payload;

      state.destination = destination;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.adultCount = adultCount;
      state.childCount = childCount;
      state.stars = stars;
      state.type = type;
      state.facility = facility;
      state.price = price;

      if (hotelId) {
        state.hotelId = hotelId;
      }
    },

    clearSearch: (state) => {
      state = initialState;
    },
  },
});

export const { saveSearchValues, clearSearch } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
