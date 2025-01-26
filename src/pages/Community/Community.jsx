import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import ForumPost from "./ForumPost";
import { useState } from "react";

const Community = () => {
    const [currentPage, setCurrentPage]= useState(1);

  const axiosPublic = useAxiosPublic();
  const { data: forums = [] } = useQuery({
    queryKey: ["forums",currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forums?page=${currentPage}`);
      return res.data;
    },
    keepPreviousData:true,
  });
  const {posts = [],totalPosts = 0,totalPages = 0} = forums;

  const handlePageChange = (page) => {
    if(page >= 1 && page <= totalPages){
        setCurrentPage(page)
    }
  }
  return (
    <div className="container mx-auto py-5">
      <Helmet>
        <title>FitStat | Community</title>
      </Helmet>
      <PageTitle title="Community" subTitle="Checkout all our forms here" />
     
  
    <div className="container mx-auto p-6">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <ForumPost key={post._id} post={post} />
          ))}
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xl">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
     
    </div>
    </div>
  );
};

export default Community;
