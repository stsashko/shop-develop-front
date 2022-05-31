import React, {useCallback, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {CircularProgress, FormControl, FormHelperText, MenuItem, OutlinedInput, Select} from "@mui/material";
import {getStoresAllApi} from "../../api/storeApi";

export const StoreModalSelect = ({control, defaultValue, errors, helperText}) => {
    const [stores, setStores] = useState([]);

    const getStores = useCallback(() => {
        getStoresAllApi()
            .then(({data}) => {
                setStores(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getStores();
    }, [getStores]);

    if(stores.length === 0)
        return <Select size="small" defaultValue="1" fullWidth><MenuItem value="1"><CircularProgress style={{width: '17px', height: '17px', marginTop: '3px', verticalAlign: 'top'}} /></MenuItem></Select>;

    return (
        <Controller
            name="store_id"
            control={control}
            defaultValue={defaultValue}
            render={({field}) => (
                <FormControl fullWidth error={errors}>
                    <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        input={<OutlinedInput/>}
                        size="small"
                        name="store_id"
                        inputProps={{'aria-label': 'Without label'}}
                        error={errors}
                    >
                        <MenuItem value=""><em>Store</em></MenuItem>
                        {stores.map(item => <MenuItem key={item.id} value={item.id}>{item.store_name}</MenuItem>)}
                    </Select>
                    {errors && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            )}
        />
    );

}