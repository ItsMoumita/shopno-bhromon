import React from 'react';
import KPIRow from '../../components/DashboardComponents/KPIRow';
import RecentBookings from '../../components/DashboardComponents/RecentBookings';

const DashboardHome = () => {
    return (
        <>
          <KPIRow></KPIRow>
          <RecentBookings></RecentBookings>
        </>
    );
};

export default DashboardHome;