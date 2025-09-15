import React from 'react';
import AboutBanner from '../components/AboutComponents/AboutBanner';
import Story from '../components/AboutComponents/Story';
import Mission from '../components/AboutComponents/Mission';
import Features from '../components/AboutComponents/Features';
import Team from '../components/AboutComponents/Team';

const About = () => {
    return (
        <div>
            <AboutBanner></AboutBanner>
            <Story></Story>
            <Mission></Mission>
            <Features></Features>
            <Team></Team>
        </div>
    );
};

export default About;