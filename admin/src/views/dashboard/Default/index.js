import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useQuery } from '@apollo/client';
import { GET_PROJECT_STATS, GET_REAL_ESTATE_STATS } from 'graphql/queries/dashboard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [projectStats, setProjectStats] = useState(0)
    const [sellingRsStats, setSellingRsStats] = useState({
        apartment: 0,
        house: 0,
        land: 0,
        businessPremises: 0,
        motal: 0
    })
    const [rentingRsStats, setRentingRsStats] = useState({
        apartment: 0,
        house: 0,
        land: 0,
        businessPremises: 0,
        motal: 0
    })

    const [time, setTime] = useState('All');

    const { data: rsStatsData } = useQuery(GET_REAL_ESTATE_STATS, { variables: { time }, notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' })
    const { data: pjStatsData } = useQuery(GET_PROJECT_STATS)

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        if (rsStatsData) {
            setSellingRsStats(rsStatsData.sellingPosts)
            setRentingRsStats(rsStatsData.rentingPosts)
        }

        if (pjStatsData) {
            setProjectStats(pjStatsData.projectStats.projects)
        }
    }, [rsStatsData, pjStatsData])

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}> 
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={gridSpacing} marginBottom={gridSpacing}>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <EarningCard isLoading={isLoading} data={projectStats} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <TotalOrderLineChartCard isLoading={isLoading} rentingData={rentingRsStats} sellingData={sellingRsStats} />
                            </Grid>
                        </Grid>
                        <PopularCard isLoading={isLoading} rentingData={rentingRsStats} sellingData={sellingRsStats} />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TotalGrowthBarChart 
                            isLoading={isLoading} 
                            rentingData={rentingRsStats} 
                            sellingData={sellingRsStats}
                            statsTime={time}
                            setStatsTime={setTime}
                        />
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
};

export default Dashboard;
