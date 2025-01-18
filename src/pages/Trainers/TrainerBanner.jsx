import { Link } from 'react-router-dom';

const TrainerBanner = () => {
    return (
        <div className='pt-20 flex justify-between items-center'>
            <div className='border w-3/5 mx-auto'>
                <h3>Be a Trainer</h3>
                <Link to='/trainers/apply'>Start applying today</Link>
            </div>
        </div>
    );
};

export default TrainerBanner;