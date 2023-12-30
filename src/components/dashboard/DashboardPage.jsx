import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../redux/features/userDataSlice';
import { resetEditorSettings } from '../../redux/features/editorSettingsSlice';
import { resetModelSettings } from '../../redux/features/modelSettingsSlice';
import { fetchUserActionsRecapDataFromDB } from '../../redux/features/userActionsRecapSlice';
import { useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Paper, Grid, Typography } from '@mui/material';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userActionsRecapData = useSelector((state) => state.userActionsRecap);

    useEffect(() => {
        dispatch(fetchUserActionsRecapDataFromDB());
    }, [dispatch]);

    const onLogoutClick = () => {
        dispatch(resetModelSettings());
        dispatch(resetEditorSettings());
        dispatch(handleLogout(navigate));
    };

    // Prepare data for Nivo Pie Chart
    const generateChartData = (successCount, failureCount) => {
        const total = successCount + failureCount;
        return [
            {
                id: 'Success',
                label: 'Success',
                value: total > 0 ? (successCount / total) * 100 : 0,
                color: '#b2ff59',
            },
            {
                id: 'Failure',
                label: 'Failure',
                value: total > 0 ? (failureCount / total) * 100 : 0,
                color: '#ff1744',
            },
        ];
    };

    const testGenerationChartData = generateChartData(
        userActionsRecapData.unitTestGenerationSuccessCount,
        userActionsRecapData.unitTestGenerationFailureCount
    );

    const testExecutionChartData = generateChartData(
        userActionsRecapData.unitTestExecutionSuccessCount,
        userActionsRecapData.unitTestExecutionFailureCount
    );

    return (
        <div>
            <button onClick={onLogoutClick}>Logout</button>
            <Grid container justifyContent="center" sx={{ mt: 7 }}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    justifyContent="center"
                >
                    <Paper
                        sx={{
                            height: '50vh',
                            width: '80%',
                            padding: '5vh',
                            borderRadius: 0,
                            backgroundColor: '#f5f5f5',
                        }}
                        elevation={10}
                    >
                        <Typography variant="h6" align="center">
                            Test Generation Success & Failure Rate
                        </Typography>
                        <ResponsivePie
                            data={testGenerationChartData}
                            margin={{
                                top: 40,
                                right: 80,
                                bottom: 80,
                                left: 80,
                            }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            colors={{ datum: 'data.color' }}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                },
                            ]}
                            valueFormat=">.2f"
                        />
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    justifyContent="center"
                >
                    <Paper
                        sx={{
                            height: '50vh',
                            width: '80%',
                            padding: '5vh',
                            borderRadius: 0,
                            backgroundColor: '#f5f5f5',
                        }}
                        elevation={10}
                    >
                        <Typography variant="h6" align="center">
                            Test Execution Success & Failure Rate
                        </Typography>
                        <ResponsivePie
                            data={testExecutionChartData}
                            margin={{
                                top: 40,
                                right: 80,
                                bottom: 80,
                                left: 80,
                            }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            colors={{ datum: 'data.color' }}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                },
                            ]}
                            valueFormat=">.2f"
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;
