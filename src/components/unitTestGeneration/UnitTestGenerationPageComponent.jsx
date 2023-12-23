import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchModelSettingsFromDB } from '../../redux/features/modelSettingsSlice';
import FloatingButtonRight from './FloatingButtonRight';
import RightSidebarComponent from './RightSidebarComponent';
import Editor from '@monaco-editor/react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { Box, Paper } from '@mui/material';

const UnitTestGenerationPageComponent = () => {
    const dispatch = useDispatch();
    const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
    const toggleRightSidebar = () => {
        setRightSidebarOpen(!isRightSidebarOpen);
    };
    useEffect(() => {
        dispatch(fetchModelSettingsFromDB());
    }, [dispatch]);
    const [userCode, setUserCode] = useState('// type your code here');
    const [generatedCode, setGeneratedCode] = useState(
        '// AI generated code will appear here'
    );
    const [sizes, setSizes] = useState(['50%', 'auto']);
    const handle = () => {
        console.log(userCode);
        console.log(generatedCode);
    };
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
            <Box
                sx={{
                    height: '70vh',
                    mt: 2,
                    mr: 2,
                    ml: 2,
                }}
            >
                <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
                    <Pane minSize="40%" maxSize="60%">
                        <Editor
                            height="100%"
                            theme="vs-light"
                            language="python"
                            value={userCode}
                            onChange={setUserCode}
                            loading={<span>LOADING THE EDITOR</span>}
                        />
                    </Pane>
                    <Pane minSize="40%" maxSize="60%">
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            language="python"
                            value={generatedCode}
                            options={{ readOnly: true }}
                        />
                    </Pane>
                </SplitPane>
            </Box>
            <button onClick={handle}>CLICK ME</button>
        </>
    );
};

export default UnitTestGenerationPageComponent;
