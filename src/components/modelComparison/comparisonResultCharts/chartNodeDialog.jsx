import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import OpenAIParameterDialog from './parametersDialogComponents/openAIParameterDialog';
import GeminiParameterDialog from './parametersDialogComponents/geminiParameterDialog';
import LlamaParameterDialog from './parametersDialogComponents/llamaParameterDialog';
import MistralParameterDialog from './parametersDialogComponents/mistralParameterDialog';

// eslint-disable-next-line react/prop-types
const ChartNodeDialog = ({ id, dialogOpen, setDialogOpen }) => {
    const toCompareList = useSelector(
        (state) => state.toCompareList.toCompareList
    );
    const targetModelData = toCompareList.filter(
        (modelData) => modelData.id === id
    )[0];

    const renderDialogContent = () => {
        switch (targetModelData?.LLMName) {
            case 'OpenAI':
                return <OpenAIParameterDialog modelData={targetModelData} />;
            case 'Gemini':
                return <GeminiParameterDialog modelData={targetModelData} />;
            case 'Llama':
                return <LlamaParameterDialog modelData={targetModelData} />;
            case 'Mistral':
                return <MistralParameterDialog modelData={targetModelData} />;
            default:
                return <>No Content</>;
        }
    };
    return (
        <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle
                variant="h5"
                color={'#fafafa'}
                textAlign={'center'}
                sx={{ mb: 6, backgroundColor: '#212121' }}
            >
                MODEL PARAMETERs
            </DialogTitle>
            <DialogContent sx={{ width: '100%', height: '100%' }}>
                {renderDialogContent()}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} variant="error">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChartNodeDialog;
