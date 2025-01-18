import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Classes from "../pages/Classes/Classes";
import Trainers from "../pages/Trainers/Trainers";
import Community from "../pages/Community/Community";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/Dashboard";
import Balance from "../pages/Dashboard/Balance/Balance";
import AllTrainers from "../pages/Dashboard/AllTrainers/AllTrainers";
import AppliedTrainers from "../pages/Dashboard/AppliedTrainers/AppliedTrainers";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import Subscribers from "../pages/Dashboard/Subscribers/Subscribers";
import PrivateRoute from "./PrivateRoute";


const Router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'/classes',
                element:<Classes/>
            },
            {
                path:'/trainers',
                element:<Trainers/>
            },
            {
                path:'/community',
                element:<Community/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            {
                path:'/dashboard/balance',
                element:<Balance/>
            },
            {
                path:'/dashboard/all-trainers',
                element:<AllTrainers/>
            },
            {
                path:'/dashboard/subscribers',
                element:<Subscribers/>
            },
            {
                path:'/dashboard/applied-trainers',
                element:<AppliedTrainers/>
            },
            {
                path:'/dashboard/add-class',
                element:<AddClass/>
            },
        ]
    }
])
export default Router;