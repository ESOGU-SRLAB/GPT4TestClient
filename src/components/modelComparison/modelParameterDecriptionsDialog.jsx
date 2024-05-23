import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
} from '@mui/material';

// eslint-disable-next-line react/prop-types
const ModelParameterDescriptionsDialog = ({ dialogOpen, setDialogOpen }) => {
    const parameterNameDescriptionsPairList = {
        Temperature:
            'Controls the randomness of the output. Higher values (e.g., 0.8) make the text more diverse and creative, while lower values (e.g., 0.2) make it more focused and deterministic.',
        'Max Length':
            'Limits the length of the generated text (in tokens). This can prevent the model from rambling or going off-topic.',
        'Top P (Nucleus Sampling)':
            'An alternative to temperature for controlling randomness. A value like 0.9 means the model will only consider the tokens that make up the top 90% of the probability distribution.',
        'Frequency Penalty':
            'Decreases the likelihood of repeating the same phrases or words. Higher values make the output more varied.',
        'Presence Penalty':
            'Discourages the model from repeating the same topics. Higher values make the output cover a wider range of ideas.',
        'Top K':
            'Limits the number of tokens considered at each step. A lower value makes the model more focused but less creative.',
        'Repetition Penalty':
            'Similar to frequency penalty, but it specifically penalizes the repetition of token sequences.',
        'Length Penalty':
            'Encourages the model to generate longer or shorter text. Positive values favor longer text, negative values favor shorter text.',
        'Stop Sequences':
            "Act as explicit instructions for the language model, indicating specific words, phrases, or characters at which to halt text generation.  This gives you precise control over the length and content of the output, ensuring it doesn't exceed desired boundaries or veer off-topic.",
    };

    const renderParameterValueMatch = (name, value) => {
        const keys = Object.keys(parameterNameDescriptionsPairList);
        return keys.map((key, index) => {
            const [paramName, description] = [
                key,
                parameterNameDescriptionsPairList[key],
            ];
            return (
                <>
                    <Grid item xs={10} sx={{ height: '100%' }}>
                        <Typography
                            sx={{
                                backgroundColor: '#212121',
                                color: '#eeeeee',
                                border: '2px solid #212121',
                                borderBottom: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.5em',
                                wordWrap: 'break-word',
                                height: '100%',
                            }}
                            textAlign="center"
                        >
                            {paramName.toUpperCase()}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sx={{ height: '100%', marginBottom: 2 }}>
                        <Typography
                            textAlign="center"
                            sx={{
                                backgroundColor: '#616161',
                                border: '2px solid #212121',
                                color: '#eeeeee',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.5em',
                                wordWrap: 'break-word',
                                height: '100%',
                            }}
                        >
                            {description.toString().toUpperCase()}
                        </Typography>
                    </Grid>
                </>
            );
        });
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
                ABOUT MODEL PARAMETERs
            </DialogTitle>
            <DialogContent sx={{ width: '100%', height: '100%' }}>
                <Grid
                    container
                    sx={{ width: '100%', height: '100%', marginLeft: '-1.5em' }}
                    alignItems="center"
                    justifyContent="center"
                >
                    {renderParameterValueMatch()}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} variant="error">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModelParameterDescriptionsDialog;
