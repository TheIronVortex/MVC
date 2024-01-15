// ProtectedRoute.js
import React from 'react';

export const ProtectedRoute = ({ element: Element, ...rest }) => {
    // Temporarily bypassing the user check and always rendering the element
    return <Element {...rest} />;
};

export default ProtectedRoute;
