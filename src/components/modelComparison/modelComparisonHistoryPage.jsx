import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import NoDataIcon from '../../assets/nodata.png';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
} from '@mui/material';
import ComparisonReportPage from './comparisonReportPage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ModelComparisonHistoryPage = () => {
    const { username, userEmailAddress } = useSelector(
        (state) => state.userData
    );
    const [userComparisonHistory, setUserComparisonHistory] = useState([]);

    useEffect(() => {
        try {
            const userIdentifier = username || userEmailAddress;
            (async () => {
                const response = await axios.get(
                    `http://localhost:5000/api/users/comparisonResults/getComparisonResultsHistory/?userIdentifier=${userIdentifier}`
                );
                setUserComparisonHistory(response.data);
            })();
        } catch (error) {
            toast.error('Failed to retrieve your model comparison history!');
        }
    }, [userEmailAddress, username]);

    const renderComparisonResults = () => {
        let { comparisonResultsHistories } = userComparisonHistory;
        return comparisonResultsHistories.map(
            ({ comparisonResults, dateTimeStamp }, index) => {
                const formattedDateTime = new Date(dateTimeStamp)
                    .toLocaleString()
                    .replace(',', ' -');
                return (
                    <Accordion
                        slotProps={{ transition: { unmountOnExit: true } }}
                        key={index}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon sx={{ color: 'white' }} />
                            }
                            sx={{
                                backgroundColor: '#212121',
                                border: '1px #eeeeee solid',
                            }}
                        >
                            <Typography
                                variant="caption"
                                color={'#eeeeee'}
                                fontWeight={'bold'}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                textAlign={'center'}
                            >
                                {formattedDateTime}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ComparisonReportPage
                                comparisonResultsIndividual={comparisonResults}
                            />
                        </AccordionDetails>
                    </Accordion>
                );
            }
        );
    };

    if (userComparisonHistory.length === 0) {
        // No history, render the image
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // Stack items vertically
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <img
                    src={NoDataIcon}
                    alt="No history available"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        color: '#0d47a1',
                        mt: 5, // Adjust the margin-top for spacing between image and text
                        textAlign: 'center', // Center the text
                    }}
                >
                    You did not compare any models, go compare them!
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        color: '#42a5f5',
                        mt: 5, // Adjust the margin-top for spacing between image and text
                        textAlign: 'center', // Center the text
                    }}
                >
                    Your history will appear here once you compare models!
                </Typography>
            </Box>
        );
    }
    return (
        <Grid
            container
            sx={{
                width: '100vw',
                height: '100vh',
                overflowY: 'auto',
                gap: '5vw',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant="h5"
                fontWeight={'bold'}
                sx={{
                    color: '#fafafa !important',
                    backgroundColor: '#212121 !important',
                    width: '100%',
                }}
                textAlign={'center'}
            >
                <p>COMPARISON HISTORY</p>
            </Typography>
            <Grid item xs={12} sx={{ height: '90vh', width: '100vw' }}>
                {renderComparisonResults()}
            </Grid>
        </Grid>
    );
};

export default ModelComparisonHistoryPage;
