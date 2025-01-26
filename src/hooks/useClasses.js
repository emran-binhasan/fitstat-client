import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useClasses = (search, page, limit) => {
    const axiosPublic = useAxiosPublic();

    const { data, error, isLoading } = useQuery({
        queryKey: ["classes", search, page],
        queryFn: async () => {
            const response = await axiosPublic.get("/classes", {
                params: { search, page, limit }
            });
            return response.data; // Now returns `{ total, classes }`
        }
    });

    return { data: data?.classes, total: data?.total, error, isLoading };
};

export default useClasses;

