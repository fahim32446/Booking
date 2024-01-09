import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HotelFormData } from '../type/hotelType';
import DetailsSection from './form_components/DetailsSection';

type Props = {};

const ManageHotelForm = (props: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  const onSubmit = () => {};

  return (
    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={onSubmit}>
        <DetailsSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
