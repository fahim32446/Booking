import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type SearchState = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  stars: string[];
};

const initialState: SearchState = {
  destination: '',
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 1,
  hotelId: '',
  stars: [],
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
        stars: string[];
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
      } = action.payload;

      state.destination = destination;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.adultCount = adultCount;
      state.childCount = childCount;
      state.stars = stars;

      if (hotelId) {
        state.hotelId = hotelId;
      }
    },
  },
});

export const { saveSearchValues } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
