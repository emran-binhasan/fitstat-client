import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheUser from "../../../hooks/useTheUser";



const Activity = () => {
   const [user] = useTheUser();
   console.log(user)
    return (
        <div>
            
        </div>
    );
};

export default Activity;