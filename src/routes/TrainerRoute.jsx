import { useNavigate } from "react-router-dom";
import useTheUser from "../hooks/useTheUser";
import Loading from "../pages/Others/Loading";

const TrainerRoute = ({children}) => {
    const navigate = useNavigate()
    const [user,,isLoading] = useTheUser();
    if(isLoading){
        return <Loading/>
    }
    console.log(user.role)
    if(user.role === 'trainer'){
        return children
    }

    return navigate('/')
};

export default TrainerRoute;