import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchModelSettingsFromDB } from '../../redux/features/modelSettingsSlice';
import FloatingButtonRight from './FloatingButtonRight';
import RightSidebar from './RightSidebar';
import Editor from '@monaco-editor/react';
import SplitPane, { Pane } from 'split-pane-react';
import { Box } from '@mui/material';
import EditorLoadingScreen from './EditorLoadingScreen';
import { fetchEditorSettingsFromDB } from '../../redux/features/editorSettingsSlice';
import ExecutionTerminal from './ExecutionTerminal';
import SpecialCommandTerminal from './SpecialCommandTerminal';

const UnitTestGenerationPage = () => {
    const dispatch = useDispatch();
    const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
    const toggleRightSidebar = () => {
        setRightSidebarOpen(!isRightSidebarOpen);
    };
    useEffect(() => {
        dispatch(fetchModelSettingsFromDB());
        dispatch(fetchEditorSettingsFromDB());
    }, [dispatch]);
    const [inputCode, setInputCode] = useState('# type your code here');
    const [outputCode, setOutputCode] = useState(
        '# AI generated code will appear here'
    );
    const [editorSizes, setEditorSizes] = useState(['50%', 'auto']);
    const [terminalSizes, setTerminalSizes] = useState(['50%', 'auto']);
    const inputEditorOptions = useSelector(
        (state) => state.editorSettings.inputEditorOptions
    );
    const outputEditorOptions = useSelector(
        (state) => state.editorSettings.outputEditorOptions
    );

    return (
        <>
            {' '}
            {!isRightSidebarOpen && (
                <FloatingButtonRight onClick={toggleRightSidebar} />
            )}
            <RightSidebar
                open={isRightSidebarOpen}
                toggleSidebar={toggleRightSidebar}
            />
            <Box
                sx={{
                    height: '60vh',
                    mt: 4,
                    mr: 2,
                    ml: 2,
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)', // Shadow effect
                }}
            >
                <SplitPane
                    split="vertical"
                    sizes={editorSizes}
                    onChange={setEditorSizes}
                >
                    <Pane minSize="40%" maxSize="60%">
                        <Box
                            sx={{
                                height: '100%',
                                borderRight: '2px solid #2196f3', // Add border here
                            }}
                        >
                            <Editor
                                height="100%"
                                theme="vs-light"
                                language="python"
                                value={inputCode}
                                onChange={setInputCode}
                                loading={<EditorLoadingScreen />}
                                options={inputEditorOptions}
                            />
                        </Box>
                    </Pane>
                    <Pane minSize="40%" maxSize="60%">
                        <Editor
                            height="100%"
                            theme="vs-light"
                            language="python"
                            value={outputCode}
                            options={outputEditorOptions}
                            loading={<EditorLoadingScreen />}
                        />
                    </Pane>
                </SplitPane>
            </Box>
            <Box
                sx={{
                    mr: 2,
                    ml: 2,
                    mb: 2,
                    mt: 2,
                    height: '34vh',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)', // Shadow effect
                }}
            >
                <SplitPane
                    split="horizontal"
                    sizes={terminalSizes}
                    onChange={setTerminalSizes}
                >
                    <Pane minSize="20%" maxSize="80%">
                        <Box
                            sx={{
                                height: '100%',
                                boxSizing: 'border-box',
                            }}
                        >
                            <ExecutionTerminal />
                        </Box>
                    </Pane>
                    <Pane minSize="20%" maxSize="80%">
                        <Box
                            sx={{
                                height: '100%',
                                boxSizing: 'border-box',
                                borderTop: '2px solid #2196f3',
                            }}
                        >
                            <SpecialCommandTerminal />
                        </Box>
                    </Pane>
                </SplitPane>
            </Box>
        </>
    );
};

export default UnitTestGenerationPage;
