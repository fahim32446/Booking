import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetMySingleHotelQuery,
  useUpdateHotelMutation,
} from '../api/hotelEndpoint';
import ManageHotelForm from '../components/ManageHotelForm';
import { HotelType } from '../utils/hotelType';
import Loading from '../../../components/Loading';

const EditHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useGetMySingleHotelQuery({ id: hotelId! });

  const hotelData = hotel?.data;

  // const image_Urls = JSON.parse(String(hotelData?.imageUrls));

  // const hotelDataWithImage = {
  //   ...hotelData,
  //   imageUrls: image_Urls,
  // } as HotelType;

  const [
    updateHotel,
    { isError, isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateHotelMutation();

  const handleSave = (hotelFormData: FormData) => {
    // hotelFormData.forEach(function (value, key) {
    //   console.log(key, value);
    // });

    updateHotel({ id: hotelId!, body: hotelFormData });
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

  // console.log(hotelDataWithImage);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ManageHotelForm
      hotel={hotelData}
      onSave={handleSave}
      isLoading={updateLoading}
      isSuccess={updateSuccess}
    />
  );
};

export default EditHotel;
