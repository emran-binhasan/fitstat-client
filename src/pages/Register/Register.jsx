import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from 'sweetalert2'

const Register = () => {
  const { registerUser, updateUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageUploadAPI = (`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_fileAPI}`)
  const onSubmit = async (data) => {
     try {

      const fireRes = await registerUser(data.email, data.password);
      console.log(fireRes)
      const imgRes =await axiosPublic.post(imageUploadAPI, {image:data.image[0]}, {
        headers:{"Content-Type": "multipart/form-data"}
       })
  
      const newUserInfo = { displayName: data.name, photoURL: imgRes.data.data.display_url };
      await updateUser(newUserInfo); // Update user info
  
      // Making the axios POST request
      const response = await axiosPublic.post('/users', {
        name: data.name,
        email: data.email,
        photoURL: imgRes.data.data.display_url,
        role:'member'
      });
      console.log(response);
      navigate(location.state?.from?.pathname || '/')
  
      if (response.data.insertedId) {
        Swal.fire({
          title: 'Successful',
          text: 'Account successfully created!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      }
    } catch (error) {
      console.error(error); // Log the error to console
      Swal.fire({
        title: 'Error',
        text: error.message || 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
  

  return (
    <div className="pt-16">
      <div className="flex justify-between border items-center">
        <div className="flex-1">img</div>
        <div className="flex p-10 flex-col items-center justify-center flex-1 border">
          <h3 className="text-xl font-medium text-gray-700">Register</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          {/* Name input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Type your name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("name", { required: true, minLength: 4 })}
            />
            {errors.name?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">Minimum 4 characters are required</p>
            )}
          </div>
  
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Type your email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("email")}
            />
          </div>
  
          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Type your password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
              })}
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">Minimum 6 characters are required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-400 text-sm mt-1">
                At least one uppercase letter, one lowercase letter, and one number are required!
              </p>
            )}
          </div>
  
          {/* File input */}
          <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 mb-2">Your Photo</label>
            <input
              className="w-full border p-3 rounded-md"
              type="file" name="image" required
              {...register('image')}
            />
          </div>
  
          {/* Submit Button */}
          <div className="mb-4">
            <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
              Register
            </button>
          </div>
        </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
