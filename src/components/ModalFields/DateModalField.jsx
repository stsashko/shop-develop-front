import React, {useState} from "react";
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import InputMask from "react-input-mask";

export const DateModalField = ({control, defaultValue, name, label, errors, helperText}) => {
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