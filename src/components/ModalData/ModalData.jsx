import {
    CircularProgress,
    Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, OutlinedInput, Select, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import ButtonWithLoading from "../ButtonWithLoading";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

import IconButton from "@mui/material/IconButton";

import CloseIcon from '@mui/icons-material/Close';
import {TextModalField} from "../ModalFields/TextModalField";

import {Alert} from "@mui/lab";
// import {productApi} from "../../api/productApi";

export const ModalData = ({title, id, openModal, handleCloseModal, isLoadSingle, updateSingle, insertSingle, getApi, addApi, updApi, validationSchema, children}) => {

    const [loading, setLoading] = useState(false);

    const [errorServer, setErrorServer] = useState(false);

    const {
        control, register, handleSubmit, formState: {errors}, setError, reset, setValue, trigger
    } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const [dataDb, setDataDB] = useState(false);

    const getData = useCallback(() => {
        if(id) {
            getApi(id)
                .then((data) => {
                    setDataDB(data);
                    isLoadSingle();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    useEffect(() => {
        getData();
    }, [getData]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorServer(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [errorServer])


    const submitProduct = async (id, data) => {
        return id ? await updApi(id, data) : await addApi(data);
    }

    const onSubmitData = (data) => {
        setLoading(true);

        submitProduct(dataDb?.id, data).then((data) => {
            if(id) updateSingle(data);
            else insertSingle(data);
        }).catch((error) => {
            if (typeof error[0] === 'undefined') {
                Object.keys(error).forEach((key) => {
                    setError(key, {
                        type: "manual",
                        message: error[key],
                    });
                });
            } else {
                setErrorServer(error);
            }
        }).finally(() => {
            // fileRef.current.value = null;
            setLoading(false);
        });


    };

    const childrens = children?.length ? children : [children];

    const innerFields = childrens.map(child => {

        return (
            <Grid item xs={12} sm={childrens.length > 1 ? 6 : 12} md={childrens.length > 1 ? 6 : 12} key={child.props.name}>
                <div style={{paddingTop: '5px'}}>
                    {React.cloneElement(child, {
                        ...child.props,
                        control,
                        register,
                        setValue,
                        trigger,
                        dataDb: dataDb,
                        defaultValue: dataDb?.[child.props.name] || '',
                        errors: Boolean(errors[child.props.name]?.message),
                        helperText: errors[child.props.name]?.message
                    })}
                </div>
            </Grid>
        );
    })


    return (
        <Dialog open={openModal} onClose={handleCloseModal}>
            <form onSubmit={handleSubmit(onSubmitData)} encType="multipart/form-data" noValidate>
                <DialogTitle align={'center'}>
                    {id ? 'Edit' : 'Create'} {title}
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{pr: '16px', pl: '16px', pb: 0}}>
                        {innerFields}
                        {errorServer && (
                            <Grid item xs={12}>
                                <Alert severity="error">
                                    {errorServer.map(item => <div key={item}>{item}</div>)}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <ButtonWithLoading loading={loading}>Save</ButtonWithLoading>
                </DialogActions>
            </form>
        </Dialog>
    );

}