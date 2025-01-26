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
import BookedTrainer from "../pages/Dashboard/User/BookedTrainer/BookedTrainer";
import TrainerBooking from "../pages/Trainers/TrainerBooking";;
import Payment from "../pages/Payment/Payment";;
import AddSlot from "../pages/Dashboard/Trainer/AddSlot/AddSlot";
import ManageSlot from "../pages/Dashboard/Trainer/ManageSlot/ManageSlot";
import NotFound from "../pages/Others/NotFound";


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
            {
                path:'/booking/:id',
                element:<PrivateRoute><TrainerBooking/></PrivateRoute>
            },
            {
                path:'/booking/checkout',
                element:<Payment/>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            // ADMIN
            {
                path:'/dashboard/balance',
                element:<PrivateRoute><Balance/></PrivateRoute>
            },
            {
                path:'/dashboard/all-trainers',
                element:<PrivateRoute><AllTrainers/></PrivateRoute>
            },
            {
                path:'/dashboard/subscribers',
                element:<PrivateRoute><Subscribers/></PrivateRoute>
            },
            {
                path:'/dashboard/applications',
                element:<PrivateRoute><AppliedTrainers/></PrivateRoute>
            },
            {
                path:'/dashboard/application/:id',
                element:<PrivateRoute><ApplicationDetails/></PrivateRoute>
            },
            {
                path:'/dashboard/add-class',
                element:<PrivateRoute><AddClass/></PrivateRoute>
            },
            
            // ADMIN AND TRAINER
            {
                path:'/dashboard/add-forum',
                element:<PrivateRoute><AddForum/></PrivateRoute>
            },

            // TRAINER
            {
                path:'/dashboard/add-slot',
                element:<PrivateRoute><AddSlot/></PrivateRoute>
            },
            {
                path:'/dashboard/slots',
                element:<PrivateRoute><ManageSlot/></PrivateRoute>
            },

            // MEMBER
            {
                path:'/dashboard/activity',
                element:<PrivateRoute><Activity/></PrivateRoute>
            },
            {
                path:'/dashboard/user-profile',
                element:<PrivateRoute><Profile/></PrivateRoute>
            },
            {
                path:'/dashboard/booked',
                element:<PrivateRoute><BookedTrainer/></PrivateRoute>
            },
          
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    }
])
export default Router;