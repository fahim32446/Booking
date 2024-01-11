import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAddHotelMutation } from '../api/hotelEndpoint';
import ManageHotelForm from '../components/ManageHotelForm';

const AddHotel = () => {
  const [addHotel, { isLoading, isError, isSuccess }] = useAddHotelMutation();

  const onSave = (hotelFormData: FormData) => {
    // hotelFormData.forEach(function (value, key) {
    //   console.log(key, value);
    // });

    addHotel({ data: hotelFormData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Hotel Saved!');
    }
    if (isError) {
      toast.error('Something happened wrong');
    }
  }, [isSuccess, isError]);

  return (
    <div>
      AddHotel
      <div>
        <ManageHotelForm
          isLoading={isLoading}
          onSave={onSave}
          isSuccess={isSuccess}
        />
      </div>
    </div>
  );
};

export default AddHotel;
