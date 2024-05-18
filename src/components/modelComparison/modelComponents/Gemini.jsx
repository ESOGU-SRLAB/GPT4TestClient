import {
    Box,
    Divider,
    Typography,
    FormControl,
    TextField,
    List,
    ListItem,
    Slider,
    Chip,
    Switch,
    Grid,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../../redux/features/geminiComparisonSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { addModelToCompareList } from '../../../redux/features/toCompareListSlice';

const Gemini = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.geminiComparison);

    const handleSettingsChange = (prop) => (event) => {
        if (prop === 'isUsed') {
            dispatch(
                updateSettings({ ...settings, isUsed: event.target.checked })
            );
            return;
        }

        const [minValue, maxValue] = parametersMinMaxValues[prop];
        const newValue = parseFloat(event.target.value);
        if (newValue >= minValue && newValue <= maxValue) {
            dispatch(updateSettings({ ...settings, [prop]: newValue }));
            return;
        }
        toast.warning(
            `${prop} value must be in [${minValue}, ${maxValue}] boundaries!`
        );
    };
    const [currentInput, setCurrentInput] = useState('');
    const handleInputChange = (event) => {
        setCurrentInput(event.target.value);
    };
    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            const newItem = currentInput.trim();
            if (newItem && settings.stopSequences.length < 4) {
                dispatch(
                    updateSettings({
                        ...settings,
                        stopSequences: [...settings.stopSequences, newItem],
                    })
                );
                setCurrentInput('');
            }
            event.preventDefault(); // Prevent form submission if it's part of a form
        }
    };

    const handleDeleteChip = (chipToDelete) => () => {
        dispatch(
            updateSettings({
                ...settings,
                stopSequences: settings.stopSequences.filter(
                    (chip) => chip !== chipToDelete
                ),
            })
        );
    };

    const parametersMinMaxValues = {
        temperature: [0, 2],
        maxOutputTokens: [0, 2048],
        topP: [0, 1],
        topK: [0, 500],
    };

    return (
        <Grid
            item
            xs={12}
            md={6}
            lg={5}
            sx={{
                border: '1px solid grey',
                height: '90%',
                marginX: '2rem',
                borderRadius: 0,
                display: 'block',
                overflowY: 'auto',
            }}
            role="presentation"
        >
            <Typography variant="h5" sx={{ p: 2 }} textAlign={'center'}>
                Gemini{' '}
                <IconButton
                    onClick={() => dispatch(addModelToCompareList(settings))}
                    color="success"
                    size="large"
                >
                    <AddIcon />
                </IconButton>
            </Typography>{' '}
            <Divider />
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
                                label="Temperature"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={settings.temperature}
                                onChange={handleSettingsChange('temperature')}
                                inputProps={{
                                    step: 0.01,
                                }}
                                sx={{ width: '50%' }}
                            />
                            <Slider
                                value={Number(settings.temperature)}
                                onChange={handleSettingsChange('temperature')}
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
                                label="Max Output Tokens"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={settings.maxOutputTokens}
                                onChange={handleSettingsChange(
                                    'maxOutputTokens'
                                )}
                                inputProps={{
                                    step: 1,
                                }}
                                sx={{ width: '50%' }}
                            />
                            <Slider
                                value={Number(settings.maxOutputTokens)}
                                onChange={handleSettingsChange(
                                    'maxOutputTokens'
                                )}
                                aria-labelledby="max-output-tokens-slider"
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
                                label="Top K"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={settings.topK}
                                onChange={handleSettingsChange('topK')}
                                inputProps={{
                                    step: 1,
                                }}
                                sx={{ width: '50%' }}
                            />
                            <Slider
                                value={Number(settings.topK)}
                                onChange={handleSettingsChange('topK')}
                                aria-labelledby="top-k-slider"
                                color="error"
                                min={0}
                                max={500}
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
                                flexWrap: 'wrap',
                                gap: 0.5,
                                mb: 1,
                            }}
                        >
                            {settings.stopSequences.map((chip, index) => (
                                <Chip
                                    key={index}
                                    label={chip}
                                    color="info"
                                    onDelete={handleDeleteChip(chip)}
                                />
                            ))}
                        </Box>
                        <TextField
                            label="Stop Sequences"
                            type="text"
                            variant="outlined"
                            value={currentInput}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Enter values and press Enter"
                        />
                    </FormControl>
                </ListItem>
            </List>
        </Grid>
    );
};

export default Gemini;
