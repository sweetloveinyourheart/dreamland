import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { API_ENDPOINT } from 'constants/apollo';

const status = [
    {
        value: 'Month',
        label: 'Tháng này'
    },
    {
        value: 'All',
        label: 'Tất cả'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, rentingData, sellingData, statsTime, setStatsTime }) => {
    const [chartData, setChartData] = useState({
        height: 400,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            xaxis: {
                type: 'category',
                categories: ['Căn hộ/Chung cư', 'Nhà ở', 'Đất đai', 'Mặt bằng/Văn phòng', 'Nhà trọ']
            },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        },
        series: [
            {
                name: 'Bài đăng',
                data: [0, 0, 0, 0, 0]
            }
        ]
    })

    useEffect(() => {
        setChartData(s => ({
            ...s,
            series: [
                {
                    name: 'Bài đăng',
                    data: [
                        rentingData.apartments + sellingData.apartments,
                        rentingData.houses + sellingData.houses,
                        rentingData.lands + sellingData.lands,
                        rentingData.businessPremises + sellingData.businessPremises,
                        rentingData.motals
                    ]
                }
            ],
        }))
    }, [rentingData, sellingData]);

    const onExportFile = async () => {
        window.open(API_ENDPOINT+'/stats/export')
    }

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Số liệu thống kê</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">Tin đăng bất động sản</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    {statsTime === "Month"
                                        && (
                                            <Button variant='contained' onClick={() => onExportFile()}>
                                                Xuất dữ liệu
                                            </Button>
                                        )
                                    }
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={statsTime}
                                        onChange={(e) => setStatsTime(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
