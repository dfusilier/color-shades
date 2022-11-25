import { useSearchParams } from 'react-router-dom';
import { throttle } from 'lodash';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = Object.fromEntries(
    searchParams.entries()
  );

  const setQueryParams = setSearchParams;

  const setThrottledQueryParams = throttle(
    setSearchParams, 100, { trailing: true, leading: false }
  );

  return [
    queryParams, 
    setQueryParams,
    setThrottledQueryParams
  ];
};

export default useQueryParams;