import React from "react";
import { useForm} from "react-hook-form";
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import Grid from "@mui/material/Grid";

export const TextModalField = ({control, defaultValue, name, label, errors, helperText}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field}) => (
                <TextField
                    {...field}
                    fullWidth
                    name={name}
                    label={label}
                    variant="outlined"
                    size="small"
                    error={errors}
                    helperText={helperText}
                />
            )}
        />
    );

}