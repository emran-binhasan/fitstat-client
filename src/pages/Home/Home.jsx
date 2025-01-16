import About from "./About";
import FeaturedCards from "./FeaturedCards";
import FeaturedClasses from "./FeaturedClasses";
import LatestPosts from "./LatestPosts";
import Reviews from "./Reviews";
import Slider from "./Slider";

const Home = () => {
    return (
        <div>
            <Slider/>
            <FeaturedCards/>
            <About/>
            <FeaturedClasses/>
            <Reviews/>
            <LatestPosts/>
        </div>
    );
};

export default Home;