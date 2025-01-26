import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import ForumPost from "./ForumPost";

const Community = () => {
  const axiosPublic = useAxiosPublic();
  const { data: forums = [] } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await axiosPublic.get("/forums");
      return res.data;
    },
  });
  console.log(forums);
  return (
    <div className="container mx-auto py-5">
      <Helmet>
        <title>FitStat | Community</title>
      </Helmet>
      <PageTitle title="Community" subTitle="Checkout all our forms here" />
     
  
    <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Forum Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forums.map((post) => (
            <ForumPost key={post._id} post={post} />
          ))}
        </div>
     
    </div>
    </div>
  );
};

export default Community;
