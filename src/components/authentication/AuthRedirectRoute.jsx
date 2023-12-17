import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRedirectRoute = ({ children }) => {
    const user = useSelector((state) => state.userData);

    // Check if the user data is not null (or any other condition to check if logged in)
    if (user && user.username) {
        // User is logged in, redirect to home or another appropriate page
        return <Navigate to="/dashboard" />;
    }

    // User is not logged in, render the children components (Login or Register page)
    return children;
};

export default AuthRedirectRoute;
