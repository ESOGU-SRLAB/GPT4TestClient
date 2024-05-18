import Editor from '@monaco-editor/react';
import EditorLoadingScreen from '../unitTestGeneration/EditorLoadingScreen';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComparisonEditorContent } from '../../redux/features/toCompareListSlice';
import { toast } from 'react-toastify';
const ComparisonEditor = () => {
    const dispatch = useDispatch();
    const editorContent = useSelector((state) => state.toCompareList.focalCode);
    const handleComparisonEditorChange = (editorContent) => {
        dispatch(updateComparisonEditorContent(editorContent));
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                event.ctrlKey &&
                (event.key.toLowerCase() === 's' || event.keyCode === 83)
            ) {
                event.preventDefault();
                toast.info('We save it for you, no worries 😏');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <Editor
            height="100%"
            theme="vs-light"
            language="python"
            value={editorContent}
            onChange={handleComparisonEditorChange}
            loading={<EditorLoadingScreen />}
            options={{
                fontSize: 20,
            }}
        />
    );
};

export default ComparisonEditor;
