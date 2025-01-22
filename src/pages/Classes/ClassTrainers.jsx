import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../../context/BookingProvider';

const ClassTrainers = ({ name,classId }) => {
    const axiosPublic = useAxiosPublic();
    const {selectedClass,setSelectedClass} = useContext(BookingContext);
    
    const handleSelectedClass = () => {
        setSelectedClass({selectedClass:classId})
    }
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
                trainers.map(each =>  
                <Link onClick={handleSelectedClass} to={`/trainer/${each._id}`} key={each._id}>
                    
                    <img  className='w-12 h-12 rounded-full border border-red-500' src={each.photoURL}/>
                </Link>)
            ) : (
                <p>No trainers found</p>
            )}
        </>
           
    );
};

export default ClassTrainers;
