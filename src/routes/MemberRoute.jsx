import { useNavigate } from "react-router-dom";
import useTheUser from "../hooks/useTheUser";
import Loading from "../pages/Others/Loading";

const MemberRoute = ({children}) => {
    const navigate = useNavigate()
    const [user,,isLoading] = useTheUser();
    if(user.role === 'member'){
        return children
    }
    if(isLoading){
        return <Loading/>
    }
    return navigate('/')
};

export default MemberRoute;