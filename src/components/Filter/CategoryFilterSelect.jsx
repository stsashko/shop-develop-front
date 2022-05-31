import React, {useCallback, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {MenuItem, OutlinedInput, Select} from "@mui/material";
import Grid from "@mui/material/Grid";
import {getCategoriesAllApi} from "../../api/categoryApi";

export const CategoryFilterSelect = ({control, defaultValue}) => {
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


    return (
        <Grid item xs={12} sm={6} md={4}>
            <Controller
                name="category_id"
                control={control}
                defaultValue={defaultValue}
                render={({field}) => (
                    <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        input={<OutlinedInput/>}
                        size="small"
                        name="category_id"
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value=""><em>Category</em></MenuItem>
                        {categories.map(item => <MenuItem key={item.id}
                                                          value={item.id}>{item.category_name}</MenuItem>)}
                    </Select>
                )}
            />
        </Grid>
    );

}