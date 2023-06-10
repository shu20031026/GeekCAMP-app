import useSWR from 'swr';
import { HelloResponseDataScheme } from '~/src/server/interfaces/hello/GET/Response';
import { validateFetcher } from '../components/utils/fetcher';

const useHelloSwr = () => {
  const { data, error } = useSWR(`/api/hello`, validateFetcher(HelloResponseDataScheme));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useHelloSwr;
