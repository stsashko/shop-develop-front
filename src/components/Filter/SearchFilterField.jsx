import React from "react";
import {Controller, useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import Grid from "@mui/material/Grid";

export const SearchFilterField = ({control, defaultValue}) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Controller
                name="search"
                control={control}
                defaultValue={defaultValue}
                render={({field}) => (
                    <TextField
                        {...field}
                        fullWidth
                        name="search"
                        label="Search by name"
                        variant="outlined"
                        size="small"
                    />
                )}
            />
        </Grid>
    );
}