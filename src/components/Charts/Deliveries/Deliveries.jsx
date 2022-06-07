import React, {useCallback, useEffect, useRef, useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {deliveriesChartApi} from "../../../api/deliveriesApi";

export default () => {
    const [width, setWidth] = useState(0);
    const [deliveries, setDeliveries] = useState([]);
    const myRef = useRef(null);

    const getCurrentWidth = () => {
        return (myRef ? myRef?.current?.offsetWidth : false) || 0
    }

    const getDeliveriesChart = useCallback(() => {
        deliveriesChartApi()
            .then((response) => {
                setDeliveries(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [deliveries]);

    useEffect(() => {
        getDeliveriesChart();
    }, []);

    useEffect(() => {
        setWidth(getCurrentWidth());
        window.addEventListener('resize', (event) => {
            setWidth(getCurrentWidth());
        }, true);
    }, [])

    return (
        <div ref={myRef}>
            <h2 style={{marginTop: 0}}>Deliveries</h2>
            <AreaChart
                width={width}
                height={350}
                data={deliveries}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Products" stroke="#0074b3" fill="#00AEFF" />
            </AreaChart>
        </div>
    );
}