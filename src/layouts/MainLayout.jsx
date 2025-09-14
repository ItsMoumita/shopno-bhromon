import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/HomeComponents/Navbar';
import Footer from '../components/HomeComponents/Footer';

const MainLayout = () => {
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