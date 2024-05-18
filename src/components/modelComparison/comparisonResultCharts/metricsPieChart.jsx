import { Grid } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { useState } from 'react';
import ChartNodeDialog from './chartNodeDialog';

// eslint-disable-next-line react/prop-types
const MetricsPieChart = ({ comparisonResults, metric }) => {
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

    const dataFormatter = (list) => {
        return list
            .filter((item) => selectedLines.includes(item.id))
            .map((item) => ({
                id: item.id,
                label: item.id,
                value: item[metric],
            }));
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [node, setNode] = useState(null);
    const data = dataFormatter(comparisonResults);

    return (
        <Grid item sx={{ width: '100%', height: '50vh' }}>
            <ResponsivePie
                data={data}
                onClick={(node) => {
                    setNode(node);
                    setDialogOpen(true);
                }}
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                sortByValue={true}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={0}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]],
                }}
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
                        onClick: handleLegendClick,
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
            <ChartNodeDialog
                id={node?.id}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </Grid>
    );
};

export default MetricsPieChart;
