import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    List,
    ListItem,
    FormControl,
    Box,
    TextField,
    Slider,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { equalizeOpenAISettings } from '../../redux/features/openAIComparisonSlice';
import { equalizeLLamaSettings } from '../../redux/features/llamaComparisonSlice';
import { equalizeGeminiSettings } from '../../redux/features/geminiComparisonSlice';
import { equalizeMistralSettings } from '../../redux/features/mistralComparisonSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const EqulalizeDialogComponent = ({ dialogOpen, setDialogOpen }) => {
    const dispatch = useDispatch();
    const handleEqualizeParameters = () => {
        try {
            dispatch(equalizeOpenAISettings(settings));
            dispatch(equalizeLLamaSettings(settings));
            dispatch(equalizeMistralSettings(settings));
            dispatch(equalizeGeminiSettings(settings));
            toast.success('Parameters equalized!');
        } catch (err) {
            toast.error('Unable to equalize parameters!');
        }
    };
    const parametersMinMaxValues = {
        temperature: [0, 2],
        topP: [0, 1],
        maxLength: [0, 2048],
    };

    const [settings, setSettings] = useState({
        temperature: 0.7,
        topP: 0.2,
        maxLength: 1800,
    });
    const handleSettingsChange = (prop) => (event) => {
        const [minValue, maxValue] = parametersMinMaxValues[prop];
        const newValue = parseFloat(event.target.value);

        if (newValue >= minValue && newValue <= maxValue) {
            setSettings({ ...settings, [prop]: newValue });
            return;
        }
        toast.warning(
            `${prop} value must be in [${minValue}, ${maxValue}] boundaries!`
        );
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
                EQUALIZE MODEL PARAMETERs
            </DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    label="Max Length"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={settings.maxLength}
                                    onChange={handleSettingsChange('maxLength')}
                                    inputProps={{
                                        step: 1,
                                    }}
                                    sx={{ width: '50%' }}
                                />
                                <Slider
                                    value={Number(settings.maxLength)}
                                    onChange={handleSettingsChange('maxLength')}
                                    aria-labelledby="max-length-slider"
                                    color="success"
                                    min={0}
                                    max={2048}
                                    step={1}
                                />
                            </Box>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    label="Temperature"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={settings.temperature}
                                    onChange={handleSettingsChange(
                                        'temperature'
                                    )}
                                    inputProps={{
                                        step: 0.01,
                                    }}
                                    sx={{ width: '50%' }}
                                />
                                <Slider
                                    value={Number(settings.temperature)}
                                    onChange={handleSettingsChange(
                                        'temperature'
                                    )}
                                    aria-labelledby="temperature-slider"
                                    color="warning"
                                    min={0}
                                    max={2}
                                    step={0.01}
                                />
                            </Box>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    label="Top P"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={settings.topP}
                                    onChange={handleSettingsChange('topP')}
                                    inputProps={{
                                        step: 0.01,
                                    }}
                                    sx={{ width: '50%' }}
                                />
                                <Slider
                                    value={Number(settings.topP)}
                                    onChange={handleSettingsChange('topP')}
                                    aria-labelledby="top-p-slider"
                                    color="info"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                />
                            </Box>
                        </FormControl>
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} variant="error">
                    Close
                </Button>
                <Button onClick={handleEqualizeParameters} variant="success">
                    Equalize
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EqulalizeDialogComponent;
