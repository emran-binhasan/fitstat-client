import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Fade } from 'react-awesome-reveal'; // Import the Fade animation

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const res = await axiosPublic.post('/newsletters', data);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        title: 'Successful',
        text: 'You will receive the latest updates from now!',
        icon: 'success',
        confirmButtonText: 'Got it',
      });
    }
  };

  return (
    
    <section className="py-8 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-6">
        {/* Image Section with Fade animation */}
        <Fade left>
          <div className="flex-1 max-w-md">
            <img
              src="https://i.ibb.co.com/tJv6bkN/e-mail.gif" // Replace with your image URL
              alt="Newsletter"
              className="rounded-lg w-2/3 mx-auto md:w-4/5 h-auto"
            />
          </div>
        </Fade>

        {/* Newsletter Form Section with Fade animation */}
        <div className="flex-1 ml-8 max-w-md">
          <Fade right>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Stay Informed with Our Newsletter
            </h2>
          </Fade>
          <Fade right delay={300}>
            <p className="text-base text-gray-600 mb-8 max-w-sm">
              Get the latest news, exclusive offers, and expert insights delivered straight to your inbox.
            </p>
          </Fade>

          <Fade right delay={600}>
            <form onSubmit={handleSubmit(onSubmit)} className=" p-6 rounded-lg ">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Please enter a valid email address',
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-1.5 bg-orange-500 text-white text-lg rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
              >
                Subscribe Now
              </button>
            </form>
          </Fade>

          <Fade right delay={900}>
            <p className="text-sm text-gray-500 mt-4">
              By subscribing, you agree to our{' '}
              <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
            </p>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
