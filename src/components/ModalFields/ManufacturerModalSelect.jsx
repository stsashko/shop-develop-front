import React, {useCallback, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import {getManufacturersAllApi} from "../../api/manufacturerApi";

export const ManufacturerModalSelect = ({control, defaultValue, errors, helperText}) => {

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


    if(manufacturers.length === 0)
        return <Select size="small" defaultValue="1" fullWidth><MenuItem value="1"><CircularProgress style={{width: '17px', height: '17px', marginTop: '3px', verticalAlign: 'top'}} /></MenuItem></Select>;

    return (
        <React.Fragment>
            <Controller
                name="manufacturer_id"
                control={control}
                defaultValue={manufacturers.length > 0 ? defaultValue : ''}
                render={({field}) => (
                    <FormControl fullWidth error={errors}>
                        <Select
                            {...field}
                            displayEmpty
                            fullWidth
                            input={<OutlinedInput/>}
                            size="small"
                            name="manufacturer_id"
                            inputProps={{'aria-label': 'Without label'}}
                            error={errors}
                        >
                            <MenuItem value=""><em>Manufacturer</em></MenuItem>
                            {manufacturers.map(item => <MenuItem key={item.id}
                                                                 value={item.id}>{item.manufacturer_name}</MenuItem>)}
                        </Select>
                        {errors && <FormHelperText>{helperText}</FormHelperText>}
                    </FormControl>
                )}
            />
        </React.Fragment>
    );
}