

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';


const useTheUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userData = {}, refetch,isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user?.email}`);
            return res.data;
        }
    });

    return [userData, refetch,isLoading];
};

export default useTheUser;
