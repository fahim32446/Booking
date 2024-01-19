import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetMySingleHotelQuery,
  useUpdateHotelMutation,
} from '../api/hotelEndpoint';
import ManageHotelForm from '../components/ManageHotelForm';

const EditHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const { data: hotel } = useGetMySingleHotelQuery({ id: hotelId! });

  const [
    updateHotel,
    { isError, isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateHotelMutation();

  const handleSave = (hotelFormData: FormData) => {
    // hotelFormData.forEach(function (value, key) {
    //   console.log(key, value);
    // });

    updateHotel({ id: hotelId!, body: hotelFormData });
    console.log(hotelFormData);
  };
  useEffect(() => {
    if (isError) {
      toast.error('Something happened to wrong');
    }
    if (updateSuccess) {
      toast.success('Hotel saved!');
      // navigate(-1);
    }
  }, [isError, updateSuccess]);

  return (
    <ManageHotelForm
      hotel={hotel?.data}
      onSave={handleSave}
      isLoading={updateLoading}
      isSuccess={updateSuccess}
    />
  );
};

export default EditHotel;
