import { Grid, Typography } from '@mui/material';
/* eslint-disable react/prop-types */
const MistralParameterDialog = ({ modelData }) => {
    console.log(modelData);
    const {
        LLMName,
        id,
        temperature,
        minNewTokens,
        maxNewTokens,
        topK,
        topP,
        presPenalty,
        lenPenalty,
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
            {renderParameterValueMatch('Min New Tokens', minNewTokens)}
            {renderParameterValueMatch('Max New Tokens', maxNewTokens)}
            {renderParameterValueMatch('Presence Penalty', presPenalty)}
            {renderParameterValueMatch('Length Penalty', lenPenalty)}
            {renderParameterValueMatch('Top P', topP)}
            {renderParameterValueMatch('Top K', topK)}
        </Grid>
    );
};

export default MistralParameterDialog;
