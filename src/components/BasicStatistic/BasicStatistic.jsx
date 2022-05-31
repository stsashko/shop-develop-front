import React, {useCallback, useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {basicStatisticApi} from "../../api/statisticApi";
import {purchasesChartApi} from "../../api/purchasesApi";

export default () => {
    const [statistic, setStatistic] = useState({deliveries_total: 0, purchases_total: 0});

    const getBasicStatistic = useCallback(() => {
        basicStatisticApi()
            .then((response) => {
                setStatistic({
                    ...statistic,
                    ...response
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getBasicStatistic();
    }, [getBasicStatistic]);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" align="center" gutterBottom>
                Deliveries | Purchases
            </Typography>
            <Typography component="p" variant="h4" align="center"
                        sx={{height: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', fontWeight: 'bold'}}>
                {statistic.deliveries_total} | {statistic.purchases_total}
            </Typography>
            <Typography color="text.secondary" sx={{flex: 1}} align="center">
                For the last 3 months
            </Typography>
        </React.Fragment>
    );
}