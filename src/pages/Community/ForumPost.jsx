import React, { useState } from "react";
import { FaUserShield, FaChalkboardTeacher } from "react-icons/fa"; // Import icons

const ForumPost = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to control full post visibility

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded); // Toggle the state when the button is clicked
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <img src={post.image} alt="Post" className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-gray-500 text-sm">
            <span className="text-lg font-semibold">{post.author}</span>
            {/* Render badge based on role with icons */}
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
        <p className="text-gray-600 text-sm line-clamp-3">
          {/* Conditionally display post content */}
          {isExpanded ? post.details : `${post.details.slice(0, 100)}...`}
        </p>
        <button
          onClick={toggleReadMore}
          className="text-blue-500 text-sm mt-2"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
        <div className="mt-4 flex items-center"></div>
      </div>
    </div>
  );
};

export default ForumPost;
