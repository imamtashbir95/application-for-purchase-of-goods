import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
    if (!role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;