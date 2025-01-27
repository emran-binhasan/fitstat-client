import { Navigate } from 'react-router-dom';
import useTheUser from '../hooks/useTheUser';
import Loading from '../pages/Others/Loading';

const RoleBasedRoute = ({ children, roles }) => {
    const [user,,isLoading] = useTheUser();
  
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  if(isLoading){
    return <Loading/>
}

  // If the user's role is not in the allowed roles, redirect to a different page (e.g., a "not authorized" page or home page)
  if (!roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // If the user has the correct role, allow access to the route
  return children;
};

export default RoleBasedRoute;
