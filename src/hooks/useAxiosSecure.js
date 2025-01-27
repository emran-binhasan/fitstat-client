import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({ baseURL: 'https://fistat.vercel.app' });

const useAxiosSecure = () => {
    const { logOutUser } = useAuth() || {};
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use((res) => {
        return res;
    }, async (error) => {
        console.log('error', error.response.status)
        if (error.response.status === 401 || error.response.status === 403) {
            await logOutUser()
            navigate('/login')
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
