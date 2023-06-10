import useHelloSwr from '~/src/views/SWR/hello';

const Page = () => {
  const { data, isLoading, isError } = useHelloSwr();
  return (
    <div>
      <h1 className='text-red-500'>main page!!</h1>
      <p>{data?.text}</p>
      <div>{isLoading && <div>Lording...</div>}</div>
      <div>{isError && <p>error</p>}</div>
    </div>
  );
};

export default Page;
