import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Community = () => {
    const axiosPublic = useAxiosPublic();
    const {data: forums = []} = useQuery({
        queryKey:['forums'],
        queryFn: async()=> {
           const res = await axiosPublic.get('/forums');
           return res.data
        }
    });
    console.log(forums)
    return (
        <div className="container mx-auto py-5">
        <PageTitle title='Community' subTitle='Checkout all our forms here'/>
    </div>
    );
};

export default Community;