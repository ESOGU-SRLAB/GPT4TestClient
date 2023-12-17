import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../redux/features/userDataSlice';
const DashboardPageComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogoutClick = () => {
        dispatch(handleLogout(navigate));
    };
    return (
        <>
            <button onClick={onLogoutClick}>Log out</button>
        </>
    );
};

export default DashboardPageComponent;
