import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const currentUser = Cookies.get('userInfo')
      ? JSON.parse(Cookies.get('userInfo'))
      : null;

export const ProtectedRoute = ({ element: Component, ...rest }) => {
    
  
    if (!currentUser) {
      return <Navigate to="/" />;
    }
  
    return <Component {...rest} />;
  };
  
export const AdminRoute = ({ element: Component, ...rest }) => {
    
  
    if (!currentUser || !currentUser.isAdmin) {
      return <Navigate to="/" />;
    }
  
    return <Component {...rest} />;
  };
  