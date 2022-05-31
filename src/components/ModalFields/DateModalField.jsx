import React, {forwardRef, useState} from "react";
import {useForm} from "react-hook-form";
import {Controller} from "react-hook-form";
import {FormHelperText, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
// import DatePicker from "react-datepicker";

import InputMask from "react-input-mask";

export const DateModalField = ({control, defaultValue, name, label, errors, helperText, register}) => {

    const [phone, setPhone] = useState(defaultValue);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field}) => (
                <InputMask
                    mask="9999-99-99"
                    value={phone}
                    disabled={false}
                    maskChar=" "
                    onChange={(e) => {
                        setPhone(e.target.value)
                    }}
                    {...field}
                >
                    {() => (
                        <TextField
                            fullWidth
                            name={name}
                            label={label}
                            variant="outlined"
                            size="small"
                            error={errors}
                            helperText={helperText}
                        />
                    )}
                </InputMask>
            )}
        />
    );


}