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
        field: 'minTokens',
        headerName: 'Min. Tokens',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'maxTokens',
        headerName: 'Max. Tokens',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'repPenalty',
        headerName: 'Rep. Penalty',
        width: 110,
        editable: true,
    },
    {
        field: 'presPenalty',
        headerName: 'Pres. Penalty',
        width: 110,
        editable: true,
    },
    {
        field: 'freqPenalty',
        headerName: 'Freq. Penalty',
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
        field: 'topK',
        headerName: 'Top K',
        type: 'number',
        width: 110,
        editable: true,
    },
];

const LlamaReviewGrid = () => {
    const llamaModelsInComparisonList = useSelector(
        (state) => state.toCompareList.toCompareList
    );
    const rows = llamaModelsInComparisonList
        .filter((model) => model.LLMName === 'Llama')
        .map((modelSettings) => {
            let {
                id,
                LLMName,
                modelSelection,
                topK,
                topP,
                minTokens,
                maxTokens,
                temperature,
                repPenalty,
                presPenalty,
                freqPenalty,
            } = modelSettings;

            return {
                id,
                LLMName,
                modelSelection,
                topK,
                topP,
                minTokens,
                maxTokens,
                temperature,
                repPenalty,
                presPenalty,
                freqPenalty,
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

export default LlamaReviewGrid;
