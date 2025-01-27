import axios from 'axios'
const axiosPublic = axios.create({baseURL:'https://fistat.vercel.app'})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;