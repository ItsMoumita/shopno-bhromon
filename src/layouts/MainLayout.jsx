import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/HomeComponents/Navbar';
import Footer from '../components/HomeComponents/Footer';
import AOS from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {
    useEffect(() => {
    AOS.init({
      duration: 1000,   
      once: true,      
    });
  }, []);
    return (
        <div>
             <Navbar></Navbar>
            <div className=' min-h-[calc(100vh-153px)]'>
                <Outlet/>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;