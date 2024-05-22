import { useState } from 'react';
import { Grid } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import ChartNodeDialog from './chartNodeDialog';

// eslint-disable-next-line react/prop-types
const MetricsBarChart = ({
    comparisonResults,
    metric,
    toCompareListIndividual,
}) => {
    const dataFormatter = (list) => {
        return list
            .filter((item) => selectedLines.includes(item.id))
            .map((item) => ({
                model: item.id,
                label: item.id,
                metric: item[metric],
            }));
    };
    const [selectedLines, setSelectedLines] = useState(
        comparisonResults.map((item) => item.id)
    );

    const handleLegendClick = (node) => {
        setSelectedLines((prevSelectedLines) =>
            prevSelectedLines.includes(node.id)
                ? prevSelectedLines.filter((id) => id !== node.id)
                : [...prevSelectedLines, node.id]
        );
    };

    const data = dataFormatter(comparisonResults);

    const yLabelFormatter = (metric) => {
        return metric.charAt(0).toUpperCase() + metric.slice(1);
    };

    return (
        <Grid item sx={{ width: '100%', height: '50vh' }}>
            <ResponsiveBar
                data={data}
                keys={['metric']}
                indexBy="model"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'category10' }} // Use a consistent color scheme
                colorBy="indexValue"
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Models',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: yLabelFormatter(metric),
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                legends={[
                    {
                        dataFrom: 'indexes',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        onClick: handleLegendClick,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={(e) =>
                    e.id +
                    ': ' +
                    e.formattedValue +
                    ' in country: ' +
                    e.indexValue
                }
            />
        </Grid>
    );
};

export default MetricsBarChart;
