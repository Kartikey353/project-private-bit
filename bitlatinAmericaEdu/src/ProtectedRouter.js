import React from 'react'
import { Navigate } from 'react-router-dom';
function Protected({ children }) {
    const items = JSON.parse(localStorage.getItem('logininfo')); 
    console.log(items.isSignedIn);
    if (!items.isSignedIn) {
        return <Navigate to="/blog/adminlogin" replace />
    }
    return children;
}
export default Protected;