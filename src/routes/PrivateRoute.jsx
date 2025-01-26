import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Others/Loading";

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth();
    if(loading){
      return <Loading/>
  }
  
    if(!user){
      return  <Navigate to="/login" state={{from:location}}/>
    }

    return children
};

export default PrivateRoute;