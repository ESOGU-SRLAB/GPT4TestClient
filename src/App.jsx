import { Routes, Route } from 'react-router-dom';
import LoginPageComponent from './components/authentication/LoginPageComponent';
import RegisterPageComponent from './components/authentication/RegisterPageComponent';
import NotFoundPageComponent from './components/NotFoundPageComponent';
import CounterPageComponent from './components/CounterPageComponent';
import AuthRedirectRoute from './components/authentication/AuthRedirectRoute'; // Adjust the import path as needed
import DashboardPageComponent from './components/dashboard/DashboardPageComponent';
import ProtectedRoute from './components/authentication/ProtectedRoute';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <AuthRedirectRoute>
                            <LoginPageComponent />
                        </AuthRedirectRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <AuthRedirectRoute>
                            <RegisterPageComponent />
                        </AuthRedirectRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPageComponent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/counter"
                    element={
                        <ProtectedRoute>
                            <CounterPageComponent />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundPageComponent />} />
            </Routes>
        </>
    );
}

export default App;
