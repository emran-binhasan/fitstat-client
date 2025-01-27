import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import SocialLogin from "../../components/SocialLogin";
import { Helmet } from "react-helmet-async";
import loginImg from "../../assets/auth/1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      const fireRes = await loginUser(data.email, data.password);
      if (fireRes) {
        Swal.fire({
          title: 'Successful',
          text: 'Account successfully created!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        navigate(location.state?.from?.pathname || '/');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>FitStat | Login</title>
      </Helmet>
      <div>
      <div className="flex flex-col lg:flex-row border">
          {/* Left Image Section */}
          <div className="flex-1">
            <img className="object-cover w-full h-full" src={loginImg} alt="login" />
          </div>
          
          {/* Right Form Section */}
          <div className="flex  p-10 flex-col items-center justify-center flex-1 border">
            <h3 className="text-2xl font-medium text-gray-700">Login</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Type your email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  {...register('email')}
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Type your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  {...register('password', { minLength: 6 })}
                />
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 mt-1" role="alert">
                    Password should be at least 6 characters!
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                  Login
                </button>
              </div>
            </form>

            {/* Register Link */}
            <p className="mt-4 text-center"> 
              Don't have an account? <Link className="underline text-orange-600" to="/register">Register</Link>
            </p>

            {/* Social Login */}
            <div className="mt-4">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
