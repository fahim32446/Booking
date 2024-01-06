import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CustomError } from '../redux/api';

export const displayErrorMessage = (
  error: CustomError | SerializedError | undefined
) => {
  if (error && 'status' in error && error.data && error.data.message) {
    toast.error(error.data.message);
  }
};
