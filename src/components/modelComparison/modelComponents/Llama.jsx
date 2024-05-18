import {
    Box,
    Divider,
    FormControl,
    InputLabel,
    Select,
    List,
    ListItem,
    Typography,
    MenuItem,
    TextField,
    Slider,
    Switch,
    Grid,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../../redux/features/llamaComparisonSlice';
import { toast } from 'react-toastify';
import { addModelToCompareList } from '../../../redux/features/toCompareListSlice';

const Llama = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.llamaComparison);
    const modelNameMaxLengthPairs = {
        'CodeLlama-13b': 2048,
        'CodeLlama-34b-Python': 2048,
        'Llama-70b': 2048,
    };
    const parametersMinMaxValues = {
        topK: [0, 500],
        topP: [0, 1],
        minTokens: [0, 2048],
        maxTokens: [0, 2048],
        temperature: [0, 2],
        repPenalty: [0, 1],
        presPenalty: [0, 1],
        freqPenalty: [0, 1],
    };

    const modelsList = ['CodeLlama-13b', 'CodeLlama-34b-Python', 'Llama-70b'];

    const handleSettingsChange = (prop) => (event) => {
        if (prop === 'isUsed') {
            dispatch(
                updateSettings({ ...settings, isUsed: event.target.checked })
            );
        } else if (prop === 'modelSelection') {
            dispatch(
                updateSettings({
                    ...settings,
                    modelSelection: event.target.value,
                    maxLength: modelNameMaxLengthPairs[event.target.value],
                })
            );
        } else if (prop === 'maxTokens') {
            let newValue;
            try {
                newValue = parseInt(event.target.value);
            } catch (error) {
                toast.warning('Max tokens must be integer number!');
                return;
            }
            const [minValue, maxValue] = [
                0,
                modelNameMaxLengthPairs[settings.modelSelection],
            ];
            if (newValue >= minValue && newValue <= maxValue) {
                dispatch(updateSettings({ ...settings, maxTokens: newValue }));
                return;
            }
            toast.warning(
                `Max Length value must be in [${minValue}, ${maxValue}] boundaries for ${settings.modelSelection} model`
            );
        } else {
            const [minValue, maxValue] = parametersMinMaxValues[prop];
            const newValue = parseFloat(event.target.value);

            if (newValue >= minValue && newValue <= maxValue) {
                dispatch(updateSettings({ ...settings, [prop]: newValue }));
                return;
            }
            toast.warning(
                `${prop} value must be in [${minValue}, ${maxValue}] boundaries!`
            );
        }
    };
    return (
        <Grid
            item
            xs={12}
            md={6}
            lg={5}
            sx={{
                border: '1px solid grey',
                width: '50vw',
                height: '90%',
                marginX: '2rem',
                borderRadius: 0,
                display: 'block',
                overflowY: 'auto',
            }}
            role="presentation"
        >
            <Typography variant="h5" sx={{ p: 2 }} textAlign={'center'}>
                Llama
                <IconButton
                    onClick={() => dispatch(addModelToCompareList(settings))}
                    color="success"
                    size="large"
                >
                    <AddIcon />
                </IconButton>
            </Typography>
            <Divider />
            <List>
                <ListItem>
                    <FormControl fullWidth size="small">
                        <InputLabel id="model-selection-label">
                            Model
                        </InputLabel>
                        <Select
                            labelId="model-select-label"
                            id="model-select"
                            value={settings.modelSelection}
                            label="Model"
                            onChange={handleSettingsChange('modelSelection')}
                        >
                            {modelsList.map((modelName, index) => (
                                <MenuItem value={modelName} key={index}>
                                    {modelName}
                                </MenuItem>
                            ))}
                        </Select>
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
                                color="info"
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
                                color="success"
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
                                label="Max Tokens"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={settings.maxTokens}
                                onChange={handleSettingsChange('maxTokens')}
                                inputProps={{
                                    step: 1,
                                }}
                                sx={{ width: '50%' }}
                            />
                            <Slider
                                value={Number(settings.maxTokens)}
                                onChange={handleSettingsChange('maxTokens')}
                                aria-labelledby="max-tokens-slider"
                                color="warning"
                                min={0}
                                max={
                                    modelNameMaxLengthPairs[
                                        settings.modelSelection
                                    ]
                                }
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
                                label="Repetition Penalty"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={settings.repPenalty}
                                onChange={handleSettingsChange('repPenalty')}
                                inputProps={{
                                    step: 0.01,
                                }}
                                sx={{ width: '50%' }}
                            />
                            <Slider
                                value={Number(settings.repPenalty)}
                                onChange={handleSettingsChange('repPenalty')}
                                aria-labelledby="repetition-penalty-slider"
                                color="error"
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
                                label="Presence Penalty"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={settings.presPenalty}
                                onChange={handleSettingsChange('presPenalty')}
                                inputProps={{
                                    step: 0.01,
                                }}
                                sx={{ width: '50%' }}
                            />
                            <Slider
                                value={Number(settings.presPenalty)}
                                onChange={handleSettingsChange('presPenalty')}
                                aria-labelledby="presence-penalty-slider"
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
                                label="Freq. Penalty"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={settings.freqPenalty}
                                onChange={handleSettingsChange('freqPenalty')}
                                inputProps={{
                                    step: 0.01,
                                }}
                                sx={{ width: '50%' }}
                            />
                            <Slider
                                value={Number(settings.freqPenalty)}
                                onChange={handleSettingsChange('freqPenalty')}
                                aria-labelledby="frequency-penalty-slider"
                                color="error"
                                min={0}
                                max={1}
                                step={0.01}
                            />
                        </Box>
                    </FormControl>
                </ListItem>
            </List>
        </Grid>
    );
};

export default Llama;
