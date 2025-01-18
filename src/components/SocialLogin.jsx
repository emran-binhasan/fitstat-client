import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
    const {googleLogin} = useAuth();
    const axiosPublic = useAxiosPublic()
    const handleGoogleLogin = async() => {
        googleLogin()
        .then( (res) => {
           try {
            axiosPublic.post('/users', {
                name: res.user.displayName,
                email: res.user.email,
                photoURL: res.user.photoURL,
                role:'member'
              });
              Swal.fire({
                title: 'Successful',
                text: `Welcome ${res.user.displayName}`,
                icon: 'success',
                confirmButtonText: 'Ok',
            });
           } catch (error) {
            Swal.fire({
                title: 'Successful',
                text: `${error.message || 'Failed to login'}`,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
           }
        })
        
    }
    
    return (
        <div>
            <button onClick={handleGoogleLogin} className='px-4 py-1.5 m-2 rounded-md border'>Login with Google</button>
        </div>
    );
};

export default SocialLogin;