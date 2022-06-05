import React from "react";
import {Controller} from "react-hook-form";
import {MenuItem, OutlinedInput, Select} from "@mui/material";
import Grid from "@mui/material/Grid";

export const RoleFilterSelect = ({control, defaultValue}) => {
    const roles = [
        {id: '0', label: 'editor'},
        {id: '1', label: 'administrator'}
    ];

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Controller
                name="role"
                control={control}
                defaultValue={defaultValue}
                render={({field}) => (
                    <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        input={<OutlinedInput/>}
                        size="small"
                        name="role"
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value=""><em>Role</em></MenuItem>
                        {roles.map(item => <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
                    </Select>
                )}
            />
        </Grid>
    );

}