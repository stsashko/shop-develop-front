import React, {useCallback, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {CircularProgress, FormControl, FormHelperText, MenuItem, OutlinedInput, Select} from "@mui/material";
import {getCategoriesAllApi} from "../../api/categoryApi";

export const CategoryModalSelect = ({control, defaultValue, errors, helperText}) => {
    const [categories, setCategories] = useState([]);

    const getCategories = useCallback(() => {
        getCategoriesAllApi()
            .then(({data}) => {
                setCategories(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);


    if(categories.length === 0)
        return <Select size="small" defaultValue="1" fullWidth><MenuItem value="1"><CircularProgress style={{width: '17px', height: '17px', marginTop: '3px', verticalAlign: 'top'}} /></MenuItem></Select>;

    return (
        <Controller
            name="category_id"
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
                        name="category_id"
                        inputProps={{'aria-label': 'Without label'}}
                        error={errors}
                    >
                        <MenuItem value=""><em>Category</em></MenuItem>
                        {categories.map(item => <MenuItem key={item.id}
                                                          value={item.id}>{item.category_name}</MenuItem>)}
                    </Select>
                    {errors && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            )}
        />
    );

}