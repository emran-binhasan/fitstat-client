import { useNavigate } from "react-router-dom";
import useTheUser from "../hooks/useTheUser";

const AdminRoute = () => {
    const navigate = useNavigate()
    const [user] = useTheUser();
    if(!user.role === 'admin'){
        return navigate('/')
    }
    return (
        <div>
            
        </div>
    );
};

export default AdminRoute;