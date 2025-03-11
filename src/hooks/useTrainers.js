import {useQuery} from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic';

const useTrainers = () => {
    const axiosPublic = useAxiosPublic();
    const {data:trainers = [], refetch,isLoading} = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trainers');
            return res.data;
        }
    })
    return [trainers, refetch,isLoading]
};

export default useTrainers;