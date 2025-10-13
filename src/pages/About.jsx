import React from 'react';
import AboutBanner from '../components/AboutComponents/AboutBanner';
import Story from '../components/AboutComponents/Story';
import Mission from '../components/AboutComponents/Mission';
import Features from '../components/AboutComponents/Features';
import Team from '../components/AboutComponents/Team';
import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
        <div>
            <Helmet>
                <title>About Us | সপ্নভ্রমণ</title>
            </Helmet>
            <AboutBanner></AboutBanner>
            <Story></Story>
            <Mission></Mission>
            <Features></Features>
            <Team></Team>
        </div>
    );
};

export default About;