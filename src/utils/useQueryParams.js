import { useSearchParams } from 'react-router-dom';
import { throttle } from 'lodash';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsAsObject = Object.fromEntries(
    searchParams.entries()
  );

  return [searchParamsAsObject, throttle(
    setSearchParams, 100, { trailing: true, leading: false }
  )];
};

export default useQueryParams;