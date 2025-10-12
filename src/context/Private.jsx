import React, { } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';
import Loading from '../components/ExtraComponents/Loading';


const Private = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
     const location = useLocation();
    if (loading) {
        return <Loading></Loading>;
            
        
       
    }

    if (user && user?.email) {
        return children;
    }
   return <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default Private;


