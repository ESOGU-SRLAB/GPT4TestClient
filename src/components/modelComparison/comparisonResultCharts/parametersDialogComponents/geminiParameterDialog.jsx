/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';

const GeminiParameterDialog = ({ modelData }) => {
    const {
        LLMName,
        id,
        temperature,
        maxOutputTokens,
        stopSequences,
        topP,
        topK,
    } = modelData;
    const renderParameterValueMatch = (name, value) => {
        return (
            <>
                <Grid item xs={6} sx={{ mb: 2 }}>
                    <Typography
                        sx={{
                            backgroundColor: '#e65100',
                            color: '#eeeeee',
                            height: '3em',
                            border: '2px solid #212121',
                            borderRight: 'none',
                        }}
                        alignContent={'center'}
                        textAlign={'center'}
                    >
                        {name.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography
                        textAlign={'center'}
                        alignContent={'center'}
                        sx={{
                            backgroundColor: '#ffa726',
                            border: '2px solid #212121',
                            color: '#eeeeee',
                            height: '3em',
                        }}
                    >
                        {value.toString().toUpperCase()}
                    </Typography>
                </Grid>
            </>
        );
    };
    return (
        <Grid container sx={{ width: '100%', height: '100%' }}>
            {renderParameterValueMatch('LLM Name', LLMName)}
            {renderParameterValueMatch('Comparison Model ID', id)}
            {renderParameterValueMatch('temperature', temperature)}
            {renderParameterValueMatch('Max Output Tokens', maxOutputTokens)}
            {renderParameterValueMatch('Top K', topK)}
            {renderParameterValueMatch('Top P', topP)}
            {renderParameterValueMatch(
                'Stop Sequences',
                stopSequences.join(' - ')
            )}
        </Grid>
    );
};

export default GeminiParameterDialog;
