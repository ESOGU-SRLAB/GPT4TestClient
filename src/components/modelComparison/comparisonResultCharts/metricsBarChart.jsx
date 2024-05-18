import { Grid } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';

// eslint-disable-next-line react/prop-types
const MetricsBarChart = ({ comparisonResults, metric }) => {
    const getFillList = (comparisonResults) => {
        // eslint-disable-next-line react/prop-types
        let fillList = comparisonResults.map(() => {
            let fillType = 'lines';
            return {
                match: {
                    id: 'metric',
                },
                id: fillType,
            };
        });
        return fillList;
    };
    const dataFormatter = (list) => {
        let formattedData = list.map((item) => {
            return {
                model: item.id,
                label: item.id,
                metric: item[metric],
            };
        });
        return formattedData;
    };
    const data = dataFormatter(comparisonResults);
    const yLabelFormatter = (metric) => {
        let label = metric[0].toUpperCase();
        for (let char of metric.slice(1, metric.length)) {
            if (char === char.toUpperCase()) {
                label += ` ${char}`;
                continue;
            }
            label += char;
        }
        return label;
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
                // colors={{ scheme: 'nivo' }}
                colorBy="indexValue"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={getFillList(comparisonResults)}
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
