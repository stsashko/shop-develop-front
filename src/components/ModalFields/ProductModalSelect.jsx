import React, {useEffect, useState, useMemo} from "react";
import {Controller} from "react-hook-form";
import {CircularProgress, TextField} from "@mui/material";
import {findProductApi} from "../../api/productApi";
import Autocomplete from "@mui/material/Autocomplete";
import throttle from 'lodash/throttle'

export const ProductModalSelect = ({control, defaultValue, errors, helperText, register, setValue, trigger, dataDb}) => {
    defaultValue = defaultValue ? {id: defaultValue, label: dataDb.product_name} : '';

    const [valueCurrent, setValueCurrent] = useState(defaultValue);

    const [inputValue, setInputValue] = useState('');

    const [options, setOptions] = useState([]);

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const fetch = useMemo(
        (inputValue) =>
            throttle(async (inputValue, callback) => {
                try {
                    let results = await findProductApi(inputValue);
                    callback(results);

                } catch (err) {
                    // console.log(err);
                }
            }, 300),
        [],
    );

    useEffect(() => {
        if(defaultValue?.id)
            setValue('product_id', defaultValue.id);
    }, [defaultValue])

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
                    results = results.map(option => ({id: option.product_id, label: option.product_name}));
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
        <Controller
            name="product_id"
            render={({field}) => (
                <Autocomplete
                    id="product-modal-asynchronous"
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
                        setValue('product_id', newValue?.id || '');
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
                                    label="Product"
                                    name="product_id"
                                    fullWidth
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
                                    error={errors}
                                    helperText={helperText}
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
    );
}