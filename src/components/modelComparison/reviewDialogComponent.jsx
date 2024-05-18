import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
} from '@mui/material';
import OpenAIReviewGrid from './reviewGrids/openAIReviewGrid';
import GeminiReviewGrid from './reviewGrids/geminiReviewGrid';
import MistralReviewGrid from './reviewGrids/mistralReviewGrid';
import LlamaReviewGrid from './reviewGrids/llamaReviewGrid';
import { useDispatch } from 'react-redux';
import { sendModelsToComparison } from '../../redux/features/toCompareListSlice';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ReviewDialogComponent = ({ dialogOpen, setDialogOpen }) => {
    const dispatch = useDispatch();
    const handleModelComparisonRequest = () => {
        dispatch(sendModelsToComparison());
    };
    return (
        <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="xl"
            fullWidth
        >
            <DialogTitle
                variant="h5"
                color={'#fafafa'}
                textAlign={'center'}
                sx={{ mb: 6, backgroundColor: '#212121' }}
            >
                MODELs To COMPARE LIST
            </DialogTitle>
            <DialogContent>
                <Typography
                    variant="h5"
                    textAlign={'center'}
                    gutterBottom
                    color={'#fafafa'}
                    sx={{ backgroundColor: '#424242' }}
                >
                    OpenAI Models
                </Typography>
                <OpenAIReviewGrid />
                <Divider sx={{ my: 6 }} /> {/* Add divider with margin */}
                <Typography
                    variant="h5"
                    gutterBottom
                    textAlign={'center'}
                    color={'#fafafa'}
                    sx={{ backgroundColor: '#424242' }}
                >
                    Gemini Models
                </Typography>
                <GeminiReviewGrid />
                <Divider sx={{ my: 6 }} /> {/* Add divider with margin */}
                <Typography
                    variant="h5"
                    gutterBottom
                    textAlign={'center'}
                    color={'#fafafa'}
                    sx={{ backgroundColor: '#424242' }}
                >
                    Mistral Models
                </Typography>
                <MistralReviewGrid />
                <Divider sx={{ my: 6 }} /> {/* Add divider with margin */}
                <Typography
                    variant="h5"
                    gutterBottom
                    textAlign={'center'}
                    color={'#fafafa'}
                    sx={{ backgroundColor: '#424242' }}
                >
                    LLama Models
                </Typography>
                <LlamaReviewGrid />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} variant="error">
                    Close
                </Button>
                <Button
                    onClick={() => {
                        handleModelComparisonRequest();
                    }}
                    variant="success"
                    component={Link}
                    to={'/comparison-report'}
                >
                    Compare
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewDialogComponent;
