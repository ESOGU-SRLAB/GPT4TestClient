import { Grid, Tabs, Tab, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import RadarChart from './comparisonResultCharts/radarChart';
import MetricsPieChart from './comparisonResultCharts/metricsPieChart';
import MetricsBarChart from './comparisonResultCharts/metricsBarChart';
import EditorLoadingScreen from '../unitTestGeneration/EditorLoadingScreen';
import { useState } from 'react';

const TabPanel = ({ children, value, index }) => {
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
};

// eslint-disable-next-line react/prop-types
const ComparisonReportPage = ({
    comparisonResultsIndividual,
    toCompareListIndividual,
}) => {
    const reduxComparisonResults = useSelector(
        (state) => state.toCompareList.comparisonResults
    );

    let comparisonResults =
        comparisonResultsIndividual || reduxComparisonResults;
    const [uniqueParamCountTabIndex, setUniqueParamCountTabIndex] = useState(1);
    const [assertionCountTabIndex, setAssertionCountTabIndex] = useState(1);
    const [uniqueVariableCountTabIndex, setUniqueVariableCountTabIndex] =
        useState(1);
    const [codeLengthTabIndex, setCodeLengthTabIndex] = useState(1);
    const [elapsedTimeTabIndex, setElapsedTimeTabIndex] = useState(1);

    return comparisonResults.length ? (
        <Grid
            container
            sx={{
                width: '95vw',
                height: '100vh',
                overflowY: 'auto',
                rowGap: '10vh',
                justifyContent: 'center',
            }}
        >
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
                <p>COMPARISON REPORTs</p>
            </Typography>
            <Grid item xs={12} lg={6} sx={{ height: '50vh' }}>
                <RadarChart comparisonResults={comparisonResults} />
            </Grid>
            {/* <Grid item sx={{ width: '45vw', height: '50vh' }}>
                <MetricsBarChart
                    comparisonResults={comparisonResults}
                    metric={'isExecutable'}
                />
            </Grid> */}

            <Grid item xs={12} lg={6} sx={{ height: '50vh' }}>
                <Tabs
                    value={uniqueParamCountTabIndex}
                    onChange={(event, newIndex) => {
                        setUniqueParamCountTabIndex(newIndex);
                    }}
                    aria-label="comparison tabs"
                    variant="fullWidth"
                >
                    <Tab
                        label="Unique Param Count"
                        disabled
                        sx={{
                            color: '#fafafa !important',
                            backgroundColor: '#616161 !important',
                        }}
                    />
                    <Tab label="Pie Chart" />
                    <Tab label="Bar Chart" />
                </Tabs>
                <TabPanel value={uniqueParamCountTabIndex} index={1}>
                    <MetricsPieChart
                        toCompareListIndividual={toCompareListIndividual}
                        comparisonResults={comparisonResults}
                        metric={'uniqueParamCount'}
                    />
                </TabPanel>
                <TabPanel value={uniqueParamCountTabIndex} index={2}>
                    <MetricsBarChart
                        comparisonResults={comparisonResults}
                        metric={'uniqueParamCount'}
                    />
                </TabPanel>
            </Grid>
            <Grid item xs={12} lg={6} sx={{ height: '50vh' }}>
                <Tabs
                    value={assertionCountTabIndex}
                    onChange={(event, newIndex) => {
                        setAssertionCountTabIndex(newIndex);
                    }}
                    aria-label="comparison tabs"
                    variant="fullWidth"
                >
                    <Tab
                        label="Assertion Count"
                        disabled
                        sx={{
                            color: '#fafafa !important',
                            backgroundColor: '#616161 !important',
                        }}
                    />
                    <Tab label="Pie Chart" />
                    <Tab label="Bar Chart" />
                </Tabs>
                <TabPanel value={assertionCountTabIndex} index={1}>
                    <MetricsPieChart
                        toCompareListIndividual={toCompareListIndividual}
                        comparisonResults={comparisonResults}
                        metric={'assertionCount'}
                    />
                </TabPanel>
                <TabPanel value={assertionCountTabIndex} index={2}>
                    <MetricsBarChart
                        comparisonResults={comparisonResults}
                        metric={'assertionCount'}
                    />
                </TabPanel>
            </Grid>

            <Grid item xs={12} lg={6} sx={{ height: '50vh' }}>
                <Tabs
                    value={codeLengthTabIndex}
                    onChange={(event, newIndex) => {
                        setCodeLengthTabIndex(newIndex);
                    }}
                    aria-label="comparison tabs"
                    variant="fullWidth"
                >
                    <Tab
                        label="Code Length - Char Count"
                        disabled
                        sx={{
                            color: '#fafafa !important',
                            backgroundColor: '#616161 !important',
                        }}
                    />
                    <Tab label="Pie Chart" />
                    <Tab label="Bar Chart" />
                </Tabs>
                <TabPanel value={codeLengthTabIndex} index={1}>
                    <MetricsPieChart
                        toCompareListIndividual={toCompareListIndividual}
                        comparisonResults={comparisonResults}
                        metric={'codeLength'}
                    />
                </TabPanel>
                <TabPanel value={codeLengthTabIndex} index={2}>
                    <MetricsBarChart
                        comparisonResults={comparisonResults}
                        metric={'codeLength'}
                    />
                </TabPanel>
            </Grid>
            <Grid item xs={12} lg={6} sx={{ height: '50vh' }}>
                <Tabs
                    value={uniqueVariableCountTabIndex}
                    onChange={(event, newIndex) => {
                        setUniqueVariableCountTabIndex(newIndex);
                    }}
                    aria-label="comparison tabs"
                    variant="fullWidth"
                >
                    <Tab
                        label="Unique Variable Count"
                        disabled
                        sx={{
                            color: '#fafafa !important',
                            backgroundColor: '#616161 !important',
                        }}
                    />
                    <Tab label="Pie Chart" />
                    <Tab label="Bar Chart" />
                </Tabs>
                <TabPanel value={uniqueVariableCountTabIndex} index={1}>
                    <MetricsPieChart
                        toCompareListIndividual={toCompareListIndividual}
                        comparisonResults={comparisonResults}
                        metric={'uniqueVariableCount'}
                    />
                </TabPanel>
                <TabPanel value={uniqueVariableCountTabIndex} index={2}>
                    <MetricsBarChart
                        comparisonResults={comparisonResults}
                        metric={'uniqueVariableCount'}
                    />
                </TabPanel>
            </Grid>

            <Grid item xs={12} lg={6} sx={{ height: '50vh' }}>
                <Tabs
                    value={elapsedTimeTabIndex}
                    onChange={(event, newIndex) => {
                        setElapsedTimeTabIndex(newIndex);
                    }}
                    aria-label="comparison tabs"
                    variant="fullWidth"
                >
                    <Tab
                        label="Elapsed Time (ms)"
                        disabled
                        sx={{
                            color: '#fafafa !important',
                            backgroundColor: '#616161 !important',
                        }}
                    />
                    <Tab label="Pie Chart" />
                    <Tab label="Bar Chart" />
                </Tabs>
                <TabPanel value={elapsedTimeTabIndex} index={1}>
                    <MetricsPieChart
                        comparisonResults={comparisonResults}
                        toCompareListIndividual={toCompareListIndividual}
                        metric={'elapsedTime'}
                    />
                </TabPanel>
                <TabPanel value={elapsedTimeTabIndex} index={2}>
                    <MetricsBarChart
                        comparisonResults={comparisonResults}
                        toCompareListIndividual={toCompareListIndividual}
                        metric={'elapsedTime'}
                    />
                </TabPanel>
            </Grid>
        </Grid>
    ) : (
        <Grid
            container
            sx={{
                width: '100vw',
                height: '100vh',
                overflowY: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <EditorLoadingScreen />
        </Grid>
    );
};

export default ComparisonReportPage;
