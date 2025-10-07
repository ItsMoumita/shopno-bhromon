
import Gallery from '../components/HomeComponents/Gallery';
import Hero from '../components/HomeComponents/Hero';
import RecentPackagesCarousel from '../components/HomeComponents/RecentPackagesCarousel';
import RecentResortsCarousel from '../components/HomeComponents/RecentResortsCarousel';

const Home = () => {
  
    return (
        <div>
            <Hero></Hero>
            <RecentPackagesCarousel></RecentPackagesCarousel>
            <RecentResortsCarousel></RecentResortsCarousel>
            <Gallery></Gallery>
        </div>
    );
};

export default Home;