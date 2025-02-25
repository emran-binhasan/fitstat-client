import { useForm } from "react-hook-form";
import useImageAPI from "../../../hooks/useImageAPI";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import DashboardTitle from "../../../components/DashboardTitle";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useTheUser from "../../../hooks/useTheUser";

const AddForum = () => {
  const [user] = useTheUser(); // Fetch user data
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const imageUploadAPI = useImageAPI();

  const onSubmit = async (data) => {
    if (!user) {
      // Ensure user data is available before submitting the form
      Swal.fire({
        title: "Error",
        text: "User data is not available. Please try again later.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const imgRes = await axiosPublic.post(
        imageUploadAPI,
        { image: data.image[0] },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const forumData = {
        title: data.title,
        image: imgRes.data.data.display_url,
        details: data.details,
        author: user.name,
        role: user.role,
        postedAt: new Date(),
      };

      const res = await axiosSecure.post(`/forums`, forumData);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Successful",
          text: "Forum successfully created!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error while creating the forum.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border">
      <DashboardTitle title="Add Forum" />
      <Helmet>
        <title>FitStat | Add Forum</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 p-5 mx-auto border"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-gray-600 font-medium">
              Forum Title *
            </label>
            <input
              {...register("title", { required: "Forum title is required" })}
              type="text"
              placeholder="Enter forum title"
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-600 font-medium">
              Banner Image *
            </label>
            <input
              className="w-full border p-3 rounded-md"
              type="file"
              name="image"
              required
              {...register("image")}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 font-medium">Details *</label>
          <textarea
            {...register("details", { required: "Details are required" })}
            placeholder="Description in details...."
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300 h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition duration-500"
        >
          Add Forum
        </button>
      </form>
    </div>
  );
};

export default AddForum;
