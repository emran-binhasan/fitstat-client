import { createContext, useEffect, useState } from "react";
import {auth} from "../configs/firebase.config"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider =new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (data) => {
        return updateProfile(auth.currentUser, data)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(user)
            if(currentUser){
                const userInfo = {email:currentUser?.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res => {
                    localStorage.setItem("access-token",res.data)
                })
            }
            else{
                localStorage.removeItem("access-token")
            }
            setLoading(false)

           
        });
        return ()=> unsubscribe();
    },[user,axiosPublic])

    const authInfo = {registerUser, loginUser, updateUser, user, loading, setUser, setLoading, logOutUser, googleLogin}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;