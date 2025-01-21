import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Classes from "../pages/Classes/Classes";
import Trainers from "../pages/Trainers/Trainers";
import Community from "../pages/Community/Community";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/Dashboard";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import PrivateRoute from "./PrivateRoute";
import TrainerForm from "../pages/Trainers/TrainerForm";
import ApplicationDetails from "../pages/Dashboard/Admin/AppliedTrainers/ApplicationDetails";
import AddForum from "../pages/Dashboard/AddForum/AddForum";
import TrainerDetails from "../pages/Trainers/TrainerDetails";
import Balance from "../pages/Dashboard/Admin/Balance/Balance";
import Subscribers from "../pages/Dashboard/Admin/Subscribers/Subscribers";
import AllTrainers from "../pages/Dashboard/Admin/AllTrainers/AllTrainers";
import AppliedTrainers from "../pages/Dashboard/Admin/AppliedTrainers/AppliedTrainers";
import Activity from "../pages/Dashboard/User/Activity/Activity"
import Profile from "../pages/Dashboard/User/Profile/Profile";

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
                path:'/trainer/:id',
                element:<TrainerDetails/>
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
                element:<AddForum/>
            },
            {
                path:'/dashboard/activity',
                element:<Activity/>
            },
            {
                path:'/dashboard/user-profile',
                element:<Profile/>
            },
        ]
    }
])
export default Router;