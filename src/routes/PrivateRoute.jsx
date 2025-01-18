import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth();
    if(loading){
      return <div>loading........................</div>
  }
  
    if(!user){
      return  <Navigate to="/login" state={{from:location}}/>
    }

    return children
};

export default PrivateRoute;