import { Routes, Route, Link } from 'react-router-dom';
import LoginPageComponent from './components/authentication/LoginPageComponent';
import RegisterPageComponent from './components/authentication/RegisterPageComponent';
import NotFoundPageComponent from './components/NotFoundPageComponent';
import CounterPageComponent from './components/CounterPageComponent';

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPageComponent />} />
                <Route path="/register" element={<RegisterPageComponent />} />
                <Route path="/counter" element={<CounterPageComponent />} />
                <Route path="*" element={<NotFoundPageComponent />} />
            </Routes>
        </>
    );
}

export default App;
