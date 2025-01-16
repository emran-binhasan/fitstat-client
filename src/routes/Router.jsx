import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Classes from "../pages/Classes/Classes";
import Trainers from "../pages/Trainers/Trainers";
import Community from "../pages/Community/Community";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

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
    }
])
export default Router;