import DashboardTitle from "../../../components/DashboardTitle";
import { useForm } from "react-hook-form";
import useImageAPI from "../../../hooks/useImageAPI";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react"; // Importing useState for loading state

const AddClass = () => {
  const [isLoading, setIsLoading] = useState(false); // For managing loading state
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
    setIsLoading(true); // Set loading state to true
    try {
      const imgRes = await axiosPublic.post(
        imageUploadAPI,
        { image: data.image[0] },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (imgRes.data?.data?.display_url) {
        const classData = {
          name: data.name,
          image: imgRes.data.data.display_url,
          details: data.details,
        };

        const res = await axiosSecure.post(`/classes`, classData);
        if (res.data.insertedId) {
          reset();
          Swal.fire({
            title: "Successful",
            text: "Class successfully added!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error while uploading the class details.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsLoading(false); // Set loading state to false after the request is done
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border">
      <Helmet>
        <title>FitStat | Add Class</title>
      </Helmet>
      <DashboardTitle title="Add Class" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 p-5 mx-auto border"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-medium">
              Class Name *
            </label>
            <input
              {...register("name", { required: "Class name is required" })}
              type="text"
              placeholder="Enter class name"
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-600 font-medium">
              Class Image *
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
            {...register("details", { required: "Details is required" })}
            placeholder="Write about the class..."
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300 h-32"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading} // Disable the button when loading
          className={`w-full bg-green-500 text-white py-2 rounded transition duration-500 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {isLoading ? "Adding Class..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
