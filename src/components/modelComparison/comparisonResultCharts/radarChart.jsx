import { ResponsiveRadar } from '@nivo/radar';
import { Grid } from '@mui/material';

// eslint-disable-next-line react/prop-types
const RadarChart = ({ comparisonResults }) => {
    const radarChartDataFormatter = (comparisonResults) => {
        let formattedData = [
            { metric: 'Is Executable' },
            { metric: 'Assertion Count' },
            { metric: 'Unique Var. Count' },
            { metric: 'Unique Param. Count' },
            { metric: 'Code Length' },
            { metric: 'Elapsed Time' },
        ];

        for (let result of comparisonResults) {
            let {
                id,
                // LLMName,
                // code,
                isExecutable,
                assertionCount,
                uniqueVariableCount,
                uniqueParamCount,
                codeLength,
                elapsedTime,
            } = result;
            elapsedTime /= 1000;
            codeLength /= 100;
            isExecutable = isExecutable ? 1 : 0;
            formattedData[0][id] = isExecutable;
            formattedData[1][id] = assertionCount;
            formattedData[2][id] = uniqueVariableCount;
            formattedData[3][id] = uniqueParamCount;
            formattedData[4][id] = codeLength;
            formattedData[5][id] = elapsedTime;
        }
        return formattedData;
    };

    return (
        <ResponsiveRadar
            data={radarChartDataFormatter(comparisonResults)}
            keys={[
                ...new Set(
                    // eslint-disable-next-line react/prop-types
                    comparisonResults.map((item) => item.id)
                ),
            ]}
            indexBy="metric"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default RadarChart;
