import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../../components/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import Rating from "react-rating";
import Swal from "sweetalert2";
import Loading from "../../../Others/Loading";

const BookedTrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Fetch booked trainer info
  const {
    data: bookedTrainer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainer", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch existing review
  const {
    data: review,
    isLoading: reviewLoading,
    refetch,
  } = useQuery({
    queryKey: ["review", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(review, user.email);

  if (isLoading || reviewLoading) return <Loading />;
  if (error)
    return <p className="text-center text-red-500">Error loading data</p>;


  const {
    trainerName,
    packageName,
    packagePrice,
    slotName,
    userEmail,
    userName,
    classId,
  } = bookedTrainer;

  // If review data is an array, get the first review

  // Submit Review
  const handleReviewSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please provide a rating and review text.",
      });
      return;
    }

    const reviewData = {
      trainerId: classId,
      userName: userName,
      userEmail: user.email,
      rating,
      reviewText,
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Your review has been successfully posted.",
      });
      setIsModalOpen(false);
      setReviewText("");
      setRating(0);
      refetch();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <Helmet>
        <title>FitStat | Booked Trainer</title>
      </Helmet>
      <DashboardTitle title="Booked Trainer" />
   
   {bookedTrainer?<> <div className="w-4/5 mx-auto border p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-center">
          Trainer Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <p>
            <strong>Trainer Name:</strong> {trainerName}
          </p>
          <p>
            <strong>Package:</strong> {packageName}
          </p>
          <p>
            <strong>Price:</strong> ${packagePrice}
          </p>
          <p>
            <strong>Slot:</strong> {slotName}
          </p>
          <p>
            <strong>Booked By:</strong> {userName} ({userEmail})
          </p>
        </div>

        <div className="mt-6 text-center">
          {review ? (
            // If review exists, show the review
            <div className="border p-4 rounded-md text-left bg-gray-50 dark:bg-gray-700">
              <h3 className="font-semibold my-1">Your Review</h3>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Rating:</span>
                <Rating
                  initialRating={review.rating}
                  readonly
                  emptySymbol={
                    <span className="text-gray-400 text-2xl">☆</span>
                  }
                  fullSymbol={
                    <span className="text-yellow-400 text-2xl">★</span>
                  }
                />
              </div>
              <p className="mt-1">{review.reviewText}</p>
            </div>
          ) : (
            // If no review, show "Write a Review" button
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Write a Review
            </button>
          )}
        </div>
      </div></>:(
          <div className="flex justify-center h-[60vh] items-center">
          <p>You don't have any booked Trainers !</p>
        </div>
        )}
     


      {/* Tailwind CSS Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Write a Review</h2>

            {/* Rating Component */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold">Rating:</span>
              <Rating
                initialRating={rating}
                onChange={setRating}
                emptySymbol={<span className="text-gray-400 text-2xl">☆</span>}
                fullSymbol={<span className="text-yellow-400 text-2xl">★</span>}
              />
            </div>

            {/* Review Text */}
            <textarea
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
              rows="3"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
