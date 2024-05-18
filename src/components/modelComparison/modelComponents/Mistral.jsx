import {
    Box,
    Divider,
    FormControl,
    ListItem,
    Typography,
    TextField,
    Slider,
    Switch,
    Grid,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../../redux/features/mistralComparisonSlice';
import { toast } from 'react-toastify';
import { addModelToCompareList } from '../../../redux/features/toCompareListSlice';

const Mistral = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.mistralComparison);

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

    const parametersMinMaxValues = {
        topK: [0, 2048],
        temperature: [0, 2],
        topP: [0, 1],
        presPenalty: [0, 2],
        lenPenalty: [0, 1],
        maxNewTokens: [0, 2048],
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
                Mistral
                <IconButton
                    onClick={() => dispatch(addModelToCompareList(settings))}
                    color="success"
                    size="large"
                >
                    <AddIcon />
                </IconButton>
            </Typography>
            <Divider />
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
                            color="warning"
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
                            label="Pres. Penalty"
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
                            label="Len. Penalty"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={settings.lenPenalty}
                            onChange={handleSettingsChange('lenPenalty')}
                            inputProps={{
                                step: 0.01,
                            }}
                            sx={{ width: '50%' }}
                        />
                        <Slider
                            value={Number(settings.lenPenalty)}
                            onChange={handleSettingsChange('lenPenalty')}
                            aria-labelledby="length-penalty-slider"
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
                            label="Max New Tokens"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={settings.maxNewTokens}
                            onChange={handleSettingsChange('maxNewTokens')}
                            inputProps={{
                                step: 1,
                            }}
                            sx={{ width: '50%' }}
                        />
                        <Slider
                            value={Number(settings.maxNewTokens)}
                            onChange={handleSettingsChange('maxNewTokens')}
                            aria-labelledby="max-new-tokens-slider"
                            color="success"
                            min={0}
                            max={2048}
                            step={1}
                        />
                    </Box>
                </FormControl>
            </ListItem>
        </Grid>
    );
};

export default Mistral;
