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
import Activity from "../pages/Dashboard/User/Activity/Activity";
import Profile from "../pages/Dashboard/User/Profile/Profile";
import BookedTrainer from "../pages/Dashboard/User/BookedTrainer/BookedTrainer";
import TrainerBooking from "../pages/Trainers/TrainerBooking";
import Payment from "../pages/Payment/Payment";
import AddSlot from "../pages/Dashboard/Trainer/AddSlot/AddSlot";
import ManageSlot from "../pages/Dashboard/Trainer/ManageSlot/ManageSlot";
import NotFound from "../pages/Others/NotFound";
import AdminRoute from "./AdminRoute";
import RoleBasedRoute from "./RoleBasedRoute"; // Import the RoleBasedRoute
import TrainerRoute from "./TrainerRoute";
import MemberRoute from "./MemberRoute";

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/classes',
        element: <Classes />
      },
      {
        path: '/trainers',
        element: <Trainers />
      },
      {
        path: '/trainer/:id',
        element: <TrainerDetails />
      },
      {
        path: '/community',
        element: <Community />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/trainers/apply',
        element: <PrivateRoute><TrainerForm /></PrivateRoute>
      },
      {
        path: '/booking/:id',
        element: <PrivateRoute><TrainerBooking /></PrivateRoute>
      },
      {
        path: '/booking/checkout',
        element: <Payment />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // ADMIN
      {
        path: '/dashboard/balance',
        element: <PrivateRoute><AdminRoute><Balance /></AdminRoute></PrivateRoute>
      },
      {
        path: '/dashboard/all-trainers',
        element: <PrivateRoute><AdminRoute><AllTrainers /></AdminRoute></PrivateRoute>
      },
      {
        path: '/dashboard/subscribers',
        element: <PrivateRoute><AdminRoute><Subscribers /></AdminRoute></PrivateRoute>
      },
      {
        path: '/dashboard/applications',
        element: <PrivateRoute><AdminRoute><AppliedTrainers /></AdminRoute></PrivateRoute>
      },
      {
        path: '/dashboard/application/:id',
        element: <PrivateRoute><AdminRoute><ApplicationDetails /></AdminRoute></PrivateRoute>
      },
      // Protect `AddClass` with role-based access (admin and trainer)
      {
        path: '/dashboard/add-class',
        element: (
          <PrivateRoute>
            <RoleBasedRoute roles={['admin', 'trainer']}>
              <AddClass />
            </RoleBasedRoute>
          </PrivateRoute>
        )
      },
      // Protect `AddForum` with role-based access (admin and trainer)
      {
        path: '/dashboard/add-forum',
        element: (
          <PrivateRoute>
            <RoleBasedRoute roles={['admin', 'trainer']}>
              <AddForum />
            </RoleBasedRoute>
          </PrivateRoute>
        )
      },
      // TRAINER
      {
        path: '/dashboard/add-slot',
        element: <PrivateRoute><TrainerRoute><AddSlot/></TrainerRoute></PrivateRoute>
      },
      {
        path: '/dashboard/slots',
        element: <PrivateRoute><TrainerRoute><ManageSlot /></TrainerRoute></PrivateRoute>
      },
      // MEMBER
      {
        path: '/dashboard/activity',
        element: <PrivateRoute><MemberRoute><Activity /></MemberRoute></PrivateRoute>
      },
      {
        path: '/dashboard/user-profile',
        element: <PrivateRoute><MemberRoute><Profile /></MemberRoute></PrivateRoute>
      },
      {
        path: '/dashboard/booked',
        element: <PrivateRoute><MemberRoute><BookedTrainer /></MemberRoute></PrivateRoute>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default Router;
