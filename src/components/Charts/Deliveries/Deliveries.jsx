import React, {useCallback, useEffect, useRef, useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {deliveriesChartApi} from "../../../api/deliveriesApi";

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


export default () => {

    const [width, setWidth] = useState(0);

    const [deliveries, setDeliveries] = useState([]);

    const myRef = useRef(null);

    const getCurrentWidth = () => {
        return (myRef ? myRef?.current?.offsetWidth : false) || 0
    }
    //
    const getDeliveriesChart = useCallback(() => {
        deliveriesChartApi()
            .then((response) => {
                setDeliveries(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [deliveries]);


    // getDeliveriesChart();

    useEffect(() => {
        getDeliveriesChart();
    }, []);


    useEffect(() => {
        setWidth(getCurrentWidth());
        window.addEventListener('resize', (event) => {
            setWidth(getCurrentWidth());
            // console.log('resize', getCurrentWidth());
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



