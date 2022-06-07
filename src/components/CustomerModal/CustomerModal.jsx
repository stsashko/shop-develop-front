import {
    Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import Button from "@mui/material/Button";
import ButtonWithLoading from "../ButtonWithLoading";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import validationSchema from "./validationModal";
import {getCustomerApi, addCustomerApi, updCustomerApi} from "../../api/customerApi";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {TextModalField} from "../ModalFields/TextModalField";
import {Alert} from "@mui/lab";

export const CustomerModal = ({id, openModal, handleCloseModal, isLoadSingle, updateSingle, insertSingle}) => {
    const [loading, setLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const {
        control, handleSubmit, formState: {errors}, setError
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [customer, setCustomer] = useState(false);
    const getCustomer = useCallback(() => {
        if(id) {
            getCustomerApi(id)
                .then((data) => {
                    setCustomer(data);
                    isLoadSingle();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    useEffect(() => {
        getCustomer();
    }, [getCustomer]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorServer(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [errorServer])

    const submitProduct = async (id, data) => {
        return id ? await updCustomerApi(id, data) : await addCustomerApi(data);
    }

    const onSubmitData = (data) => {
        setLoading(true);

        submitProduct(customer?.id, data).then((data) => {
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
            setLoading(false);
        });
    };

    return (
        <Dialog open={openModal} onClose={handleCloseModal}>
            <form onSubmit={handleSubmit(onSubmitData)} encType="multipart/form-data" noValidate>
                <DialogTitle align={'center'}>
                    {id ? 'Edit' : 'Create'} customer
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
                        <Grid item xs={12} sm={6} md={6}>
                            <div style={{paddingTop: '5px'}}>
                                <TextModalField
                                    control={control}
                                    name="customer_fname"
                                    defaultValue={customer?.customer_fname || ''}
                                    label="Name"
                                    errors={Boolean(errors.customer_fname?.message)}
                                    helperText={errors.customer_fname?.message}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                            <div style={{paddingTop: '5px'}}>
                                <TextModalField
                                    control={control}
                                    name="customer_lname"
                                    defaultValue={customer?.customer_lname || ''}
                                    label="Name"
                                    errors={Boolean(errors.customer_lname?.message)}
                                    helperText={errors.customer_lname?.message}
                                />
                            </div>
                        </Grid>
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