import React from "react";
import { useForm} from "react-hook-form";
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import Grid from "@mui/material/Grid";

export const TextModalField = ({control, defaultValue, name, label, errors, helperText, type='text'}) => {

    // autocomplete="on"


    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field}) => (
                <TextField
                    {...{...field, autoComplete: type === 'password' ? 'on' : 'off'}}
                    fullWidth
                    name={name}
                    type={type}
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