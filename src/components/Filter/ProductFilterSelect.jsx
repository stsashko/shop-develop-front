import React, {useEffect, useState} from "react";
import {CircularProgress, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import Autocomplete from '@mui/material/Autocomplete';
import {findProductApi} from "../../api/productApi";

export const ProductFilterSelect = ({defaultValue, register, setValue}) => {
    defaultValue = defaultValue ? {product_name: defaultValue} : '';
    const [valueCurent, setValueCurrent] = React.useState(defaultValue);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;
        if (!open)
            return undefined;
        if (inputValue === '') {
            setOptions(valueCurent ? [valueCurent] : []);
            return undefined;
        }
        (async () => {
            if (active) {
                setLoading(true);
                try {
                    let results = await findProductApi(inputValue);
                    let newOptions = [];
                    if (valueCurent)
                        newOptions = [valueCurent];
                    if (results)
                        newOptions = [...newOptions, ...results];
                    setOptions(newOptions);
                } catch (err) {}
                setLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, [valueCurent, inputValue]);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
                id="product-asynchronous"
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.product_name}
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={valueCurent}
                loading={loading}
                onChange={(event, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValueCurrent(newValue);
                    setValue('product_name', newValue?.product_name || '');
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => {
                    return (
                        <React.Fragment>
                            <TextField
                                {...params}
                                {...register("product_name")}
                                size="small"
                                label="Product"
                                name="product_name"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ?
                                                <CircularProgress color="inherit" size={20} sx={{mr: '30px'}}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        </React.Fragment>
                    )
                }}
            />
        </Grid>
    );
}