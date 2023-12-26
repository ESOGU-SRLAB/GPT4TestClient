import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../redux/features/userDataSlice';
import { resetEditorSettings } from '../../redux/features/editorSettingsSlice';
import { resetModelSettings } from '../../redux/features/modelSettingsSlice';
const DashboardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogoutClick = () => {
        dispatch(resetModelSettings());
        dispatch(resetEditorSettings());
        dispatch(handleLogout(navigate));
    };
    return (
        <>
            <button onClick={onLogoutClick}>BUTTON</button>
        </>
    );
};

export default DashboardPage;
