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
        field: 'temperature',
        headerName: 'Temperature',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'maxOutputTokens',
        headerName: 'Max Output Tokens',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'topK',
        headerName: 'Top K',
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
];

const GeminiReviewGrid = () => {
    const geminiModelsInComparisonList = useSelector(
        (state) => state.toCompareList.toCompareList
    );
    const rows = geminiModelsInComparisonList
        .filter((model) => model.LLMName === 'Gemini')
        .map((modelSettings) => {
            let {
                id,
                LLMName,
                temperature,
                maxOutputTokens,
                topP,
                topK,
                stopSequences,
            } = modelSettings;

            return {
                id,
                LLMName,
                temperature,
                maxOutputTokens,
                topP,
                topK,
                stopSequences: stopSequences.join(', '),
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

export default GeminiReviewGrid;
