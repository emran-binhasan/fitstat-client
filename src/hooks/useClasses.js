import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useClasses = (search) => {
    const axiosPublic = useAxiosPublic();

    const { data, error, isLoading } = useQuery({
        queryKey: ['classes', search],
        queryFn: async () => {
            const response = await axiosPublic.get('/classes', {
                params: { search }  // Send search term as a query parameter
            });
            return response.data;
        }
    });

    return { data, error, isLoading };
};

export default useClasses;
