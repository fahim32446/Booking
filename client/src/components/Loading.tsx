import { RiLoader2Fill } from 'react-icons/ri';

const Loading = () => {
  return (
    <div className='bg-transparent p-2 w-full'>
      <div className='flex gap-3 justify-center items-center'>
        <h3>Please Wait</h3>
        <RiLoader2Fill className='animate-spin h-5 w-5 font-thin ' />
      </div>
    </div>
  );
};

export default Loading;
