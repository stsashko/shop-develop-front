import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Content} from "../../components/Content";
import Purchases from "../../components/Charts/Purchases";
import Deliveries from "../../components/Charts/Deliveries";
import BasicStatistic from "../../components/BasicStatistic/BasicStatistic";

const DashboardPage = (props) => {
    return (
        <Content title="Dashboard" titlePage="Dashboard">
            <Grid container spacing={3} sx={{mb: '24px'}}>
                <Grid item xs={12} md={8} lg={9} sx={{height: 'auto'}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Purchases />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3} sx={{height: 'auto'}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                    >
                        <BasicStatistic />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Deliveries />
                    </Paper>
                </Grid>
            </Grid>
        </Content>
    );
}

export default DashboardPage;