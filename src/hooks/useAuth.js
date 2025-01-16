import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";


const useAuth = (data) => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;