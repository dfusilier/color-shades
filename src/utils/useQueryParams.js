import { useSearchParams } from 'react-router-dom';
import { throttle } from 'lodash';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(
    searchParams.entries()
  );

  const setQueryParams = (searchParams, throttleTime = 100) => throttle(
    () => setSearchParams(searchParams), throttleTime, { trailing: true, leading: false }
  )();

  return [queryParams, setQueryParams];
};

export default useQueryParams;