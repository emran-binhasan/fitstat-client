import { useState, useEffect } from "react";
import { FaUserShield, FaChalkboardTeacher, FaArrowUp, FaArrowDown } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ForumPost = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [voteStatus, setVoteStatus] = useState(null); // "upvoted", "downvoted", or null
  const [voteCount, setVoteCount] = useState(post?.voteCount || 0);

  const axiosSecure = useAxiosSecure();

  const {user} = useAuth()

  useEffect(() => {
    const storedVote = localStorage.getItem(`forum-vote-${post._id}`);
    if (storedVote) {
      setVoteStatus(storedVote);
    }
  }, [post._id]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpvote = async () => {
    if(!user){
      Swal.fire({
              title: "Sorry",
              text: "You must login to vote",
              icon: "error",
              confirmButtonText: "Ok",
            });
    }
    if (voteStatus === "upvoted") {
      // Cancel upvote
      await axiosSecure.patch(`/forum/downvote/${post._id}`);
      setVoteCount((prev) => prev - 1);
      setVoteStatus(null);
      localStorage.removeItem(`forum-vote-${post._id}`);
    } else {
      // Apply upvote (cancel downvote if needed)
      await axiosSecure.patch(`/forum/upvote/${post._id}`);
      setVoteCount((prev) => (voteStatus === "downvoted" ? prev + 2 : prev + 1));
      setVoteStatus("upvoted");
      localStorage.setItem(`forum-vote-${post._id}`, "upvoted");
    }
  };

  const handleDownvote = async () => {
    if(!user){
      Swal.fire({
              title: "Sorry",
              text: "You must login to vote",
              icon: "error",
              confirmButtonText: "Ok",
            });
    }
    if (voteStatus === "downvoted") {
      // Cancel downvote
      await axiosSecure.patch(`/forum/upvote/${post._id}`);
      setVoteCount((prev) => prev + 1);
      setVoteStatus(null);
      localStorage.removeItem(`forum-vote-${post._id}`);
    } else {
      // Apply downvote (cancel upvote if needed)
      await axiosSecure.patch(`/forum/downvote/${post._id}`);
      setVoteCount((prev) => (voteStatus === "upvoted" ? prev - 2 : prev - 1));
      setVoteStatus("downvoted");
      localStorage.setItem(`forum-vote-${post._id}`, "downvoted");
    }
  };

  return (
    <div className=" shadow-md rounded-lg overflow-hidden mb-4">
      <img src={post.image} alt="Post" className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-gray-500 text-sm">
            <span className="text-lg font-semibold">{post.author}</span>
            {post.role === "admin" && (
              <span className="ml-2 flex items-center px-2 py-1 text-sm bg-blue-500 text-white rounded-full">
                <FaUserShield className="mr-1" /> Admin
              </span>
            )}
            {post.role === "trainer" && (
              <span className="ml-2 flex items-center px-2 py-1 text-sm bg-green-500 text-white rounded-full">
                <FaChalkboardTeacher className="mr-1" /> Trainer
              </span>
            )}
          </div>
          <span className="ml-auto text-gray-400 text-sm">
            {new Date(post.postedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
        <p className="text-gray-600 text-sm">
          {isExpanded ? post.details : `${post.details.slice(0, 100)}...`}
        </p>
        <button onClick={toggleReadMore} className="text-blue-500 text-sm mt-2">
          {isExpanded ? "Read Less" : "Read More"}
        </button>
        <div className="mt-4 flex items-center">
          <span className="flex items-center border rounded-md shadow">
            <span className="flex gap-1 items-center px-2 py-1 rounded-md">{voteCount}</span>
            <span
              onClick={handleUpvote}
              className={`flex gap-1 items-center px-2 py-1 rounded-md cursor-pointer hover:text-orange-500 ${
                voteStatus === "upvoted" ? "text-orange-500" : ""
              }`}
            >
              <FaArrowUp /> Upvote
            </span>
            <span
              onClick={handleDownvote}
              className={`flex gap-1 items-center px-2 py-1 rounded-md cursor-pointer hover:text-orange-500 ${
                voteStatus === "downvoted" ? "text-orange-500" : ""
              }`}
            >
              <FaArrowDown /> Downvote
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;
