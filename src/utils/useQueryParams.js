import { useSearchParams } from 'react-router-dom';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsAsObject = Object.fromEntries(
    searchParams.entries()
  );

  return [searchParamsAsObject, setSearchParams];
};

export default useQueryParams;