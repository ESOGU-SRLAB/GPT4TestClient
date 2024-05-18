import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'LLMName',
        headerName: 'LLM Name',
        width: 150,
        editable: true,
    },
    {
        field: 'modelSelection',
        headerName: 'Model Selection',
        width: 150,
        editable: true,
    },
    {
        field: 'temperature',
        headerName: 'Temperature',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'maxLength',
        headerName: 'Max Length',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'stopSequences',
        headerName: 'Stop Sequences',
        width: 110,
        editable: true,
    },
    {
        field: 'topP',
        headerName: 'Top P',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'frequencyPenalty',
        headerName: 'Freq. Penalty',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'presencePenalty',
        headerName: 'Pres. Penalty',
        type: 'number',
        width: 110,
        editable: true,
    },
];

const OpenAIReviewGrid = () => {
    const openAIModelsInComparisonList = useSelector(
        (state) => state.toCompareList.toCompareList
    );

    const rows = openAIModelsInComparisonList
        .filter((model) => model.LLMName === 'OpenAI')
        .map((modelSettings) => {
            let {
                id,
                LLMName,
                modelSelection,
                temperature,
                maxLength,
                stopSequences,
                topP,
                frequencyPenalty,
                presencePenalty,
            } = modelSettings;

            // Remove the extra curly braces to return a single object:
            return {
                id,
                LLMName,
                modelSelection,
                temperature,
                maxLength,
                stopSequences: stopSequences.join(','), // Join the stop sequences into a string
                topP,
                frequencyPenalty,
                presencePenalty,
            };
        });

    return (
        <Box sx={{ height: '25vh', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default OpenAIReviewGrid;
