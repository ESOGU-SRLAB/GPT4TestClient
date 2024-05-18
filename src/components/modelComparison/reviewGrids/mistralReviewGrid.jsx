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
        field: 'maxNewTokens',
        headerName: 'Max New Tokens',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'minNewTokens',
        headerName: 'Min New Tokens',
        type: 'number',
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
    {
        field: 'presPenalty',
        headerName: 'Pres. Penalty',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'lenPenalty',
        headerName: 'Len. Penalty',
        type: 'number',
        width: 110,
        editable: true,
    },
];

const MistralReviewGrid = () => {
    const mistralModelsInComparisonList = useSelector(
        (state) => state.toCompareList.toCompareList
    );
    const rows = mistralModelsInComparisonList
        .filter((model) => model.LLMName === 'Mistral')
        .map((modelSettings) => {
            let {
                id,
                LLMName,
                isUsed,
                temperature,
                topK,
                topP,
                lenPenalty,
                minNewTokens,
                maxNewTokens,
                presPenalty,
            } = modelSettings;

            return {
                id,
                LLMName,
                isUsed,
                temperature,
                topK,
                topP,
                lenPenalty,
                minNewTokens,
                maxNewTokens,
                presPenalty,
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

export default MistralReviewGrid;
