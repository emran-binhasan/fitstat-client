import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useClassTrainers = (data) => {
    const axiosPublic = useAxiosPublic();
    const {data: classTrainers=[], refetch} = useQuery({
        queryKey:['trainerList'],
        queryFn:async() => {
            const res = await axiosPublic.get(`/trainers/${data}`)
            return res.data
        }
    })
    return [classTrainers, refetch]
};

export default useClassTrainers;