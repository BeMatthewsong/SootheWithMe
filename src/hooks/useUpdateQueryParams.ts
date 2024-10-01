import { useRouter } from 'next/navigation';

const useUpdateQueryParams = () => {
  const router = useRouter();

  const updateQueryParams = (params: { [key: string]: string | undefined }) => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    router.push(`?${searchParams.toString()}`);
  };

  return updateQueryParams;
};

export default useUpdateQueryParams;
