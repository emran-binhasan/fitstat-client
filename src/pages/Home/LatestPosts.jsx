import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { Reveal } from "react-awesome-reveal";
import ForumPost from "../Community/ForumPost";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic();
  const { data: forums = [] } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forums/latest`);
      return res.data;
    },
  });
  console.log

  return (
    <div className="container mx-auto py-8">
      <div className="container mx-auto text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Forum Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forums.map((post, index) => (
            <Reveal key={post._id} effect="fadeInRight" delay={index * 200}>
              <ForumPost post={post} />
            </Reveal>
          ))}
        </div>
        <div className="mt-3">
          <button
            onClick={() => navigate('/community')}
            className="bg-orange-500 text-white px-4 py-1.5 rounded-md text-lg hover:bg-orange-600 transition"
          >
            More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
