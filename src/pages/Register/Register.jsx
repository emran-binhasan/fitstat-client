import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { registerUser, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    registerUser(data.email, data.password)
    .then((res) => {
      const newUserInfo = {displayName: data.name}
      updateUser(newUserInfo)
      console.log(res.user)
    })
  };

  return (
    <div className="pt-16">
      <div className="flex justify-between border items-center">
        <div className="flex-1">img</div>
        <div className="flex p-10 flex-col items-center justify-center flex-1 border">
          <h3 className="text-xl font-medium text-gray-700">Register</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="name"
                placeholder="Type your name"
                required
                className="w-3xl p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("name", { required: true, minLength: 4 })}
              />
              {errors.name?.type === "minLength" && (
                <p className="text-red-400">Minimum 4 characters is required</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Type your email"
                required
                className="w-3xl p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("email")}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Type your email"
                required
                className="w-3xl p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                })}
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-400">Minimum 6 characters is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-400">
                  Atleast one uppercase one lowercase and a number is required !
                </p>
              )}
            </div>
            <div className="mb-4">
              <button className="px-4 py-1.5 border rounded-md">
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
