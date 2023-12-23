import { fetchModelSettingsFromDB } from '../../redux/features/modelSettingsSlice';
import FloatingButtonRight from './FloatingButtonRight';
import RightSidebarComponent from './RightSidebarComponent';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const UnitTestGenerationPageComponent = () => {
    const dispatch = useDispatch();
    const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
    const toggleRightSidebar = () => {
        setRightSidebarOpen(!isRightSidebarOpen);
    };
    useEffect(() => {
        dispatch(fetchModelSettingsFromDB());
    }, [dispatch]);

    return (
        <>
            {' '}
            {!isRightSidebarOpen && (
                <FloatingButtonRight onClick={toggleRightSidebar} />
            )}
            <RightSidebarComponent
                open={isRightSidebarOpen}
                toggleSidebar={toggleRightSidebar}
            />
        </>
    );
};

export default UnitTestGenerationPageComponent;
