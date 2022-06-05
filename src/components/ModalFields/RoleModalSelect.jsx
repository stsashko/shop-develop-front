import React from "react";
import {Controller} from "react-hook-form";
import { FormControl, FormHelperText, MenuItem, OutlinedInput, Select} from "@mui/material";

export const RoleModalSelect = ({control, defaultValue, errors, helperText}) => {

    const roles = [
        {id: '0', label: 'editor'},
        {id: '1', label: 'administrator'}
    ];

    return (
        <Controller
            name="role"
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
                        name="role"
                        inputProps={{'aria-label': 'Without label'}}
                        error={errors}
                    >
                        <MenuItem value=""><em>Role</em></MenuItem>
                        {roles.map(item => <MenuItem key={item.id}
                                                          value={item.id}>{item.label}</MenuItem>)}
                    </Select>
                    {errors && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            )}
        />
    );

}