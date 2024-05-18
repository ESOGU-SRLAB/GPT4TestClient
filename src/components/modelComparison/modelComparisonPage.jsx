import { useState } from 'react';
import {
    Grid,
    Paper,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    Typography,
} from '@mui/material';
import ComparisonEditor from './comparisonEditor';
import ReviewDialogComponent from './reviewDialogComponent';
import OpenAI from './modelComponents/OpenAI';
import Gemini from './modelComponents/Gemini';
import Llama from './modelComponents/Llama';
import Mistral from './modelComponents/Mistral';
import ChecklistIcon from '@mui/icons-material/Checklist';
import BalanceIcon from '@mui/icons-material/Balance';
import EqulalizeDialogComponent from './equalizeDialogComponent';

const ModelComparisonPage = () => {
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [equalizeDialogOpen, setEqualizeDialogOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleReview = () => {
        setDialogOpen(true);
    };

    const handleEqualizeParameters = () => {
        setEqualizeDialogOpen(true);
    };

    const actions = [
        { icon: <ChecklistIcon />, name: 'Review', onClick: handleReview },
        {
            icon: <BalanceIcon />,
            name: 'Equalize parameters',
            onClick: handleEqualizeParameters,
        },
    ];
    return (
        <Grid container direction="row" sx={{ height: '100vh' }}>
            <Typography
                variant="h5"
                fontWeight={'bold'}
                sx={{
                    width: '100vw',
                    color: '#fafafa !important',
                    backgroundColor: '#212121 !important',
                }}
                textAlign={'center'}
            >
                <p>SELECT MODELs To COMPARE</p>
            </Typography>
            <Grid item xs={12} sx={{ overflowX: 'auto', height: '50vh' }}>
                <Paper
                    sx={{
                        width: 'fit-content',
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                    }}
                >
                    <OpenAI />
                    <Gemini />
                    <Llama />
                    <Mistral />
                </Paper>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    height: '40vh',
                    backgroundColor: 'grey',
                    overflowY: 'auto',
                }}
            >
                <ComparisonEditor />
            </Grid>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </SpeedDial>
            <ReviewDialogComponent
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <EqulalizeDialogComponent
                dialogOpen={equalizeDialogOpen}
                setDialogOpen={setEqualizeDialogOpen}
            />
        </Grid>
    );
};

export default ModelComparisonPage;
