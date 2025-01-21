import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import DashboardTitle from "../../../../components/DashboardTitle";
import useAuth from "../../../../hooks/useAuth";
import useImageAPI from "../../../../hooks/useImageAPI";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";


const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const imageUploadAPI = useImageAPI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        const imgRes =await axiosPublic.post(imageUploadAPI, {image:data.image[0]}, {
            headers:{"Content-Type": "multipart/form-data"}
           })
      
          const newUserInfo = { displayName: data.name, photoURL: imgRes.data.data.display_url  };
          const res = await updateUser(newUserInfo); 
          console.log(res)
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsModalOpen(false); // Close the modal after successful update
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the profile.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border p-6 bg-gray-50">
      <DashboardTitle title="Profile" />
      <div className="flex flex-col items-center space-y-6 bg-white rounded-lg shadow-lg p-8 w-3/4 mx-auto">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Email */}
        <div className="text-center">
          <h4 className="text-2xl font-semibold text-gray-700">
            {user.displayName}
          </h4>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Last Login */}
        <p className="text-sm text-gray-400">
          Last Login: {user.metadata.lastSignInTime}
        </p>

        {/* Update Profile Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 shadow-md hover:bg-blue-600 transition duration-200"
        >
          Update Profile
        </button>
      </div>

      {/* Modal for updating profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                defaultValue={user.displayName}
                {...register("name", { required: "Name is required" })}
                placeholder="Update Name"
                className="p-2 mb-4 border rounded"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              <label htmlFor="image" className="block text-gray-700 mb-2">
                Your Photo *
              </label>
              <input
                className="w-full border p-3 rounded-md"
                type="file"
                name="image"
                required
                {...register("image")}
              />

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
