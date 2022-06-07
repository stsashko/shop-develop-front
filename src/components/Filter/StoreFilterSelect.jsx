import React, {useCallback, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {MenuItem, OutlinedInput, Select} from "@mui/material";
import Grid from "@mui/material/Grid";
import {getStoresAllApi} from "../../api/storeApi";

export const StoreFilterSelect = ({control, defaultValue}) => {
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

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Controller
                name="store_id"
                control={control}
                defaultValue={defaultValue}
                render={({field}) => (
                    <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        input={<OutlinedInput/>}
                        size="small"
                        name="store_id"
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value=""><em>Store</em></MenuItem>
                        {stores.map(item => <MenuItem key={item.id}
                                                          value={item.id}>{item.store_name}</MenuItem>)}
                    </Select>
                )}
            />
        </Grid>
    );
}