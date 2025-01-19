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
import PublicRoute from "./PublicRoute";
import TrainerForm from "../pages/Trainers/TrainerForm";
import ApplicationDetails from "../pages/Dashboard/AppliedTrainers/ApplicationDetails";
import AddForm from "../pages/Dashboard/AddForum/AddForm";


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
                element:<PublicRoute><Login/></PublicRoute>
            },
            {
                path:'/register',
                element:<PublicRoute><Register/></PublicRoute>
            },
            {
                path:'/trainers/apply',
                element:<PrivateRoute><TrainerForm/></PrivateRoute>
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
                path:'/dashboard/applications',
                element:<AppliedTrainers/>
            },
            {
                path:'/dashboard/application/:id',
                element:<ApplicationDetails/>
            },
            {
                path:'/dashboard/add-class',
                element:<AddClass/>
            },
            {
                path:'/dashboard/add-forum',
                element:<AddForm/>
            },
        ]
    }
])
export default Router;