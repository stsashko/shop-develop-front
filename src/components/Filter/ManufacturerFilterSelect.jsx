import React, {useCallback, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {MenuItem, OutlinedInput, Select} from "@mui/material";
import Grid from "@mui/material/Grid";
import {getManufacturersAllApi} from "../../api/manufacturerApi";

export const ManufacturerFilterSelect = ({control, defaultValue}) => {
    const [manufacturers, setManufacturers] = useState([]);
    const getManufacturers = useCallback(() => {
        getManufacturersAllApi()
            .then(({data}) => {
                setManufacturers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getManufacturers();
    }, [getManufacturers]);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Controller
                name="manufacturer_id"
                control={control}
                defaultValue={defaultValue}
                render={({field}) => (
                    <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        input={<OutlinedInput/>}
                        size="small"
                        name="manufacturer_id"
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value=""><em>Manufacturer</em></MenuItem>
                        {manufacturers.map(item => <MenuItem key={item.id}
                                                             value={item.id}>{item.manufacturer_name}</MenuItem>)}
                    </Select>
                )}
            />
        </Grid>
    );
}