import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import SocialLogin from "../../components/SocialLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const {loginUser} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const fireRes = await loginUser(data.email, data.password);
      if(fireRes){
        Swal.fire({
          title: 'Successful',
          text: 'Account successfully created!',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
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
  }
  

  return (
    <>
     <Helmet>
        <title>Hello World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="pt-16">
      <div className="flex justify-between border items-center">
        <div className="flex-1">img</div>
        <div className="flex p-10 flex-col items-center justify-center flex-1 border">
          <h3 className="text-xl font-medium text-gray-700">Login</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Type your email" required
                    className="w-3xl p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" {...register('email')}
                  />
            </div>
            <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Type your email"
                    className="w-3xl p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" {...register('password', {minLength:6})}
                  />
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500 mt-1" role="alert">
                      Password shouldbe atleast 6 characters !
                    </p>
              )}
            </div>
            <div className="mb-4">
              <button className="px-4 py-1.5 border rounded-md">Login</button>
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <div>
           <SocialLogin/>
          </div>
        </div>
        
      </div>
    </div>
    </>
   
  );
};

export default Login;
