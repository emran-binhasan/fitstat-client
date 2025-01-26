import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../../context/BookingProvider';

const ClassTrainers = ({ name,classId }) => {
    const axiosPublic = useAxiosPublic();
    const {selectedClass,setSelectedClass} = useContext(BookingContext);
    
    const handleSelectedClass = () => {
        setSelectedClass({
            label:name,
            value:classId
        })
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
                    <Link 
                    onClick={handleSelectedClass} 
                    to={`/trainer/${each._id}`} 
                    key={each._id} 
                    className="relative group"
                >
                    <img 
                        className="w-12 h-12 rounded-full border border-red-500" 
                        src={each.photoURL}
                    />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {each.name}
                    </span>
                </Link>)
            ) : (
                <p>No trainers found</p>
            )}
        </>
           
    );
};

export default ClassTrainers;
