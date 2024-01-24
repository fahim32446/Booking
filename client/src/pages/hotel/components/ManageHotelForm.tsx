import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HotelFormData, HotelType } from '../utils/hotelType';
import DetailsSection from './form_components/DetailsSection';
import FacilitiesSection from './form_components/FacilitiesSection';
import GuestsSection from './form_components/GuestsSection';
import ImagesSection from './form_components/ImagesSection';
import TypeSection from './form_components/TypeSection';

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  isSuccess: boolean;
};

const ManageHotelForm = ({ isLoading, onSave, hotel, isSuccess }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    const facilitiesInStr: any = hotel?.facilities;
    const facilities: string[] = facilitiesInStr && JSON.parse(facilitiesInStr);

    const imageURLStr: any = hotel?.imageUrls;
    const imageUrls: string[] = imageURLStr && JSON.parse(imageURLStr);

    if (hotel)
      reset({ ...hotel, facilities: facilities, imageUrls: imageUrls });
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append('hotelId', hotel.hotelId);
    }
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    const imageUrlsStr: any = formDataJson.imageUrls;
    const imageUrls: string[] = imageUrlsStr && JSON.parse(imageUrlsStr);

    if (imageUrls) {
      imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  useEffect(() => {
    if (isSuccess) reset({});
  }, [isSuccess]);

  return (
    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />

        <span className='flex justify-end'>
          <button
            disabled={isLoading}
            type='submit'
            className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500'
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
