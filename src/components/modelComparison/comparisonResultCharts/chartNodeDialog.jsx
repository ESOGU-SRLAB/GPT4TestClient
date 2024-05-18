import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import OpenAIParameterDialog from './parametersDialogComponents/openAIParameterDialog';

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
            <DialogContent>{renderDialogContent()}</DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} variant="error">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChartNodeDialog;
