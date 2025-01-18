

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';


const useTheUser = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: userData = {}, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user?.email}`);
            return res.data;
        }
    });

    return [userData, refetch];
};

export default useTheUser;
