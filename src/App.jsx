import { Routes, Route } from 'react-router-dom';
import LoginPageComponent from './components/authentication/LoginPageComponent';
import RegisterPageComponent from './components/authentication/RegisterPageComponent';
import NotFoundPageComponent from './components/NotFoundPageComponent';
import AuthRedirectRoute from './components/authentication/AuthRedirectRoute'; // Adjust the import path as needed
import DashboardPageComponent from './components/dashboard/DashboardPageComponent';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import AuthenticatedLayout from './components/authentication/AuthenticatedLayout';
import UnitTestGenerationPageComponent from './components/unitTestGeneration/UnitTestGenerationPageComponent';

// import Spinner from './components/Spinner';
// import { useState, useEffect } from 'react';

function App() {
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     setTimeout(() => setLoading(false), 1000);
    // }, []);
    // if (loading) return <Spinner />;
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
                            <AuthenticatedLayout>
                                <DashboardPageComponent />
                            </AuthenticatedLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/generation"
                    element={
                        <ProtectedRoute>
                            <AuthenticatedLayout>
                                <UnitTestGenerationPageComponent />
                            </AuthenticatedLayout>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundPageComponent />} />
            </Routes>
        </>
    );
}

export default App;
