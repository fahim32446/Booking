import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/reduxHooks';
import { useGetMySingleHotelQuery } from '../../hotel/api/hotelEndpoint';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import BookingForm from '../components/BookingForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { usePostPaymentMutation } from '../api/searchEndpoints';
import Loading from '../../../components/Loading';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

const BookingHotels = () => {
  const stripePromise = loadStripe(STRIPE_PUB_KEY);
  const { hotelId } = useParams();
  const search = useAppSelector((state) => state.search);
  const user = useAppSelector((state) => state.user);

  const currentUser = user.user?.email;

  const { data: hotel, isLoading } = useGetMySingleHotelQuery({ id: hotelId! });

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(
          new Date(search.checkOut).getTime() -
            new Date(search.checkIn).getTime()
        ) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const [postPayment, { data: paymentToken, isLoading: paymentIntentLoading }] =
    usePostPaymentMutation();

  useEffect(() => {
    if (numberOfNights >= 1)
      postPayment({ hotelId: hotelId!, numberOfNights: numberOfNights });
  }, [numberOfNights]);

  if (isLoading) return <Loading />;

  if (!hotel?.data) {
    return <></>;
  }

  return (
    <div className='grid md:grid-cols-[1fr_2fr]'>
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel.data}
      />

      {numberOfNights == 0 && (
        <p className='p-5 font-semibold text-center'>
          Please select at least 1 night for payment
        </p>
      )}
      {currentUser && paymentToken && !paymentIntentLoading && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentToken?.data?.clientSecret,
          }}
        >
          <BookingForm paymentIntent={paymentToken.data} />
        </Elements>
      )}
    </div>
  );
};

export default BookingHotels;
