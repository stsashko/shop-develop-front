import React, {useCallback, useEffect, useState, useMemo} from "react";
import {Controller} from "react-hook-form";
import {CircularProgress, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {getProductsAllApi} from "../../api/categoryApi";
import Autocomplete from '@mui/material/Autocomplete';
import {findCustomerApi, getCustomerApi} from "../../api/customerApi";
import throttle from "lodash/throttle";
import {findProductApi} from "../../api/productApi";

export const CustomerFilterSelect = ({control, defaultValue, register, setValue}) => {

    // const [customer, setCustomer] = useState(defaultValue);

    // defaultValue = defaultValue ? {customer_id: defaultValue} : '';

    // defaultValue = defaultValue ? {customer_id: defaultValue} : '';


    const [valueCurrent, setValueCurrent] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect( () => {
        if(defaultValue) {
            (async () => {
                try {
                    let results = await getCustomerApi(defaultValue);
                    setValueCurrent({
                        id: results.id,
                        label: `${results.customer_fname} ${results.customer_lname}`
                    });
                } catch (err) {
                    // console.log(err);
                }
            })();
        }
    }, []);

    const fetch = useMemo(
        (inputValue) =>
            throttle(async (inputValue, callback) => {
                try {
                    let results = await findCustomerApi(inputValue);
                    callback(results);

                } catch (err) {
                    // console.log(err);
                }
            }, 300),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!open)
            return undefined;

        if (inputValue === '') {
            setOptions(valueCurrent ? [valueCurrent] : []);
            return undefined;
        }

        (async () => {
            if (active) {
                setLoading(true);
                fetch(inputValue, (results) => {
                    results = results.map(option => ({id: option.customer_id, label: option.customer_name}));
                    if (results) {
                        setOptions(results);
                    }
                    setLoading(false);
                });
            }
        })();

        return () => {
            active = false;
        };
    }, [valueCurrent, inputValue, fetch]);


    return (
        <Grid item xs={12} sm={6} md={4}>
            <Controller
                name="customer_id"
                render={({field}) => (
                    <Autocomplete
                        id="customer-asynchronous"
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
                        onClose={() => {
                            setOpen(false);
                        }}
                        fullWidth
                        filterOptions={(x) => x}
                        options={options}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        value={valueCurrent}
                        loading={loading}
                        onChange={(event, newValue) => {
                            setValueCurrent(newValue);
                            setValue('customer_id', newValue?.id || '');
                        }}
                        onInputChange={(event, newInputValue, reason) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) => {
                            return (
                                 <React.Fragment>
                                    <TextField
                                        {...params}
                                        size="small"
                                        label="Customer"
                                        name="customer_id"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ?
                                                        <CircularProgress color="inherit" size={20}
                                                                          sx={{mr: '30px'}}/> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                        {...field}
                                    />
                                 </React.Fragment>
                            )
                        }}
                    />
                )}
                control={control}
                defaultValue={defaultValue}
            />
        </Grid>
    );

}










