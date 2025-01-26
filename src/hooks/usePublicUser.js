

import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


const usePublicUser = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: userData = {}, refetch,isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user?.email}`);
            return res.data;
        }
    });

    return [userData, refetch,isLoading];
};

export default usePublicUser;
