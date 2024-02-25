// @mui
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(chart)(({ theme }) => ({
    height: CHART_HEIGHT,
    '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
        height: `100% !important`,
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        borderTop: `dashed 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}));

// ----------------------------------------------------------------------

export default function CircleGroupChart({ title, subheader, chart, ...other }) {
    const theme = useTheme();

    const { colors, series, options } = chart;

    const chartSeries = series.map((i) => i.value);

    const chartOptions = useChart({
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        colors,
        labels: series.map((i) => i.label),
        stroke: { colors: [theme.palette.background.paper] },
        legend: {
            offsetY: 0,
            floating: true,
            position: 'bottom',
            horizontalAlign: 'center',
        },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (value) => value,
                title: {
                    formatter: (seriesName) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '90%',
                    labels: {
                        value: {
                            formatter: (value) => value,
                        },
                        total: {
                            formatter: (w) => {
                                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return sum;
                            },
                        },
                    },
                },
            },
        },
        ...options,
    });

    return (
        <Card
            sx={{ borderRadius: '15px', boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px' }}
            {...other}
        >
            <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

            <StyledChart
                dir="ltr"
                type="donut"
                series={chartSeries}
                options={chartOptions}
                height={280}
            />
        </Card>
    );
}

CircleGroupChart.propTypes = {
    chart: PropTypes.object,
    subheader: PropTypes.string,
    title: PropTypes.string,
};
