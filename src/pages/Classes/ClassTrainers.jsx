import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const ClassTrainers = ({ name }) => {
    const axiosPublic = useAxiosPublic();
    
    const { data: trainers = [] } = useQuery({
        queryKey: ['trainerList', name],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers/${name}`);
            return res.data;
        },
        enabled: !!name 
    });

    return (
        <>
         {trainers.length > 0 ? (
                trainers.map(each =>  <Link to={`/trainer/${each._id}`} key={each._id}><img  className='w-12 h-12 rounded-full border border-red-500' src={each.photoURL}/></Link>)
            ) : (
                <p>No trainers found</p>
            )}
        </>
           
    );
};

export default ClassTrainers;
