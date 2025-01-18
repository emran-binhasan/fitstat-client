import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplicationDetails = () => {
    const param = useParams();
    const axiosSecure = useAxiosSecure();
    console.log(param.id)
    const [appDetail, setAppDetail] = useState([]);
    useEffect(()=>{
        axiosSecure.get('/')
    })
    return (
        <div>
            hello
        </div>
    );
};

export default ApplicationDetails;