
import { Helmet } from 'react-helmet-async';
import Contact from '../components/HomeComponents/Contact';
import FaqSection from '../components/HomeComponents/FaqSection';
import Gallery from '../components/HomeComponents/Gallery';
import Hero from '../components/HomeComponents/Hero';
import RecentPackagesCarousel from '../components/HomeComponents/RecentPackagesCarousel';
import RecentResortsCarousel from '../components/HomeComponents/RecentResortsCarousel';

const Home = () => {
  
    return (
        <div>
            <Helmet>
                <title>Home | সপ্নভ্রমণ</title>
            </Helmet>
            <Hero></Hero>
            <RecentPackagesCarousel></RecentPackagesCarousel>
            <RecentResortsCarousel></RecentResortsCarousel>
            <Gallery></Gallery>
            <FaqSection></FaqSection>
            <Contact></Contact>
        </div>
    );
};

export default Home;