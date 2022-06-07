import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
    Label,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart
} from 'recharts';

import {purchasesChartApi} from "../../../api/purchasesApi";

export default function() {
    const [width, setWidth] = useState(0);
    const [purchases, setPurchases] = useState([]);
    const myRef = useRef(null);

    const getCurrentWidth = () => {
        return (myRef ? myRef?.current?.offsetWidth : false) || 0
    }

    const getPurchasesChart = useCallback(() => {
        purchasesChartApi()
            .then((response) => {
                setPurchases(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [purchases]);

    useEffect(() => {
        getPurchasesChart();
    }, []);

    useEffect(() => {
        setWidth(getCurrentWidth());
        window.addEventListener('resize', (event) => {
            setWidth(getCurrentWidth());
        }, true);
    }, [])

    return (
        <div ref={myRef}>
            <h2 style={{marginTop: 0}}>Purchases</h2>
            <BarChart
                width={width}
                height={200}
                data={purchases}
                margin={{
                    top: 0,
                    right: 15,
                    bottom: 0,
                    left: 12,
                }}
            >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#00AEFF">
                    <Label
                        angle={270}
                        position="left"
                        style={{
                            textAnchor: 'middle',
                        }}
                    >
                        Total purchases
                        {/*Sales ($)*/}
                    </Label>
                </YAxis>
                <YAxis yAxisId="right" orientation="right" stroke="#FFE414">
                    <Label
                        angle={-270}
                        position="right"
                        style={{
                            textAnchor: 'middle',
                        }}
                    >
                        Total ($)
                    </Label>
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="Purchases" fill="#00AEFF" barSize={10} />
                <Bar yAxisId="right" dataKey="Total" fill="#FFE414" barSize={10} />
            </BarChart>
        </div>
    );
}