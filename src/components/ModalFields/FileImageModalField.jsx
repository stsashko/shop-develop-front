import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {Controller} from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {FormControl, FormHelperText} from "@mui/material";

import ImageIcon from '@mui/icons-material/Image';

export const FileImageModalField = ({control, defaultValue, name, register, errors, helperText}) => {

    const [changeFile, setChangeFile] = useState(false);

    const fileField = register(name, {required: true});

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field}) => (
                <FormControl error={errors} fullWidth sx={{flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}}>
                    <Avatar sx={{display: 'inline-flex', mr: 2}}
                            src={defaultValue || ''}>{!defaultValue ? <ImageIcon /> : null}</Avatar>
                    <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        startIcon={changeFile ? <CheckCircleOutlineIcon/> : null}
                    >
                        {defaultValue ? 'Change' : 'Upload'}
                        <input
                            type="file"
                            {...fileField}
                            name={name}
                            onChange={(e) => {
                                fileField.onChange(e);
                                setChangeFile(true);
                            }}
                            hidden
                        />
                    </Button>
                    <FormHelperText error={errors} sx={{display: 'flex', width: '100%'}}>
                        {helperText}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );

}