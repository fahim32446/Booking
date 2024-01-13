import { useParams } from 'react-router-dom';
import { useGetMySingleHotelQuery } from '../api/hotelEndpoint';
import ManageHotelForm from '../components/ManageHotelForm';

const EditHotel = () => {
  const { hotelId } = useParams();

  const {
    data: hotel,
    isLoading,
    isSuccess,
  } = useGetMySingleHotelQuery({ id: hotelId! });

  const handleSave = (hotelFormData: FormData) => {
    // mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      hotel={hotel?.data}
      onSave={handleSave}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};

export default EditHotel;
