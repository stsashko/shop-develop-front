import React, {forwardRef, useState} from "react";
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import Grid from "@mui/material/Grid";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const DateFilterRange = ({control, defaultValue, register, setValue}) => {
    const [dateRange, setDateRange] = useState( defaultValue !== '' ? defaultValue.split(" - ").filter(d => d !== '').map(d => new Date(d)) : [null, null]);

    const [startDate, endDate] = dateRange;

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {

        // console.log(value);
        setValue('date', value);

        return <TextField
            {...register("date")}
            fullWidth
            name="date"
            label="Search by date"
            variant="outlined"
            size="small"
            onClick={onClick}
            ref={ref}
            defaultValue={value}
        />
    });

    return (
        <Grid item xs={12} sm={6} md={4}>
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update, v) => {
                    // console.log(update, v);

                    setDateRange(update);
                }}
                customInput={<ExampleCustomInput />}
                isClearable={true}
                dateFormat="yyyy/MM/dd"
            />
        </Grid>
    );

}