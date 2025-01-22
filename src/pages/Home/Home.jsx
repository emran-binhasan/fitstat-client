import { Helmet } from "react-helmet-async";
import About from "./About";
import FeaturedCards from "./FeaturedCards";
import FeaturedClasses from "./FeaturedClasses";
import LatestPosts from "./LatestPosts";
import Newsletter from "./Newsletters";
import Reviews from "./Reviews";
import Slider from "./Slider";

const Home = () => {
    return (
        <div>
     <Helmet>
        <title>FitStat | Home</title>
      </Helmet>
            <Slider/>
            <FeaturedCards/>
            <About/>
            <FeaturedClasses/>
            <Reviews/>
            <Newsletter/>
            <LatestPosts/>
        </div>
    );
};

export default Home;