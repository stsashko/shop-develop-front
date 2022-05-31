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
import validationSchema from "./validation";
import {updateProfileAction} from "../../redux/actions/profileActions";
import Avatar from "@mui/material/Avatar";
import {getCategoriesApi} from "../../api/categoryApi";

import {addProductApi, productApi, updProductApi} from "../../api/productApi";
import IconButton from "@mui/material/IconButton";

import CloseIcon from '@mui/icons-material/Close';
import {TextModalField} from "../ModalFields/TextModalField";
import {CategoryModalSelect} from "../ModalFields/CategoryModalSelect";
import {ManufacturerModalSelect} from "../ModalFields/ManufacturerModalSelect";
import {FileImageModalField} from "../ModalFields/FileImageModalField";
import {Alert} from "@mui/lab";

export const ProductModal = ({id, openModal, handleCloseModal, isLoadSingle, updateSingleProduct, insertSingleProduct}) => {

    const [loading, setLoading] = useState(false);

    const [errorServer, setErrorServer] = useState(false);

    const {
        control, register, handleSubmit, formState: {errors}, setError, reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // const fileReg = register('image');
    // const fileRef = useRef();

    // const [categories, setCategories] = useState([]);
    //
    // const getCategories = useCallback(() => {
    //     categoryApi()
    //         .then(({data}) => {
    //             setCategories(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    //
    // useEffect(() => {
    //     getCategories();
    // }, [getCategories]);


    // const [manufacturers, setManufacturers] = useState([]);
    //
    // const getManufacturers = useCallback(() => {
    //     manufacturerApi()
    //         .then(({data}) => {
    //             setManufacturers(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    //
    // useEffect(() => {
    //     getManufacturers();
    // }, [getManufacturers]);


    const [product, setProduct] = useState(false);

    const getProduct = useCallback(() => {
        if(id) {
            productApi(id)
                .then((data) => {
                    setProduct(data);
                    isLoadSingle();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorServer(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [errorServer])


    const submitProduct = async (id, data) => {
       return id ? await updProductApi(id, data) : await addProductApi(data);
        // return await addProductApi(data);
    }

    const onSubmitData = (data) => {
        setLoading(true);

        // let submitProduct = id ? updProductApi : addProductApi;

        submitProduct(product?.id, data).then((data) => {
            if(id) updateSingleProduct(data);
            else insertSingleProduct(data);
        }).catch((error) => {
            if (typeof error[0] === 'undefined') {
                Object.keys(error).forEach((key) => {
                    if (key === 'image')
                        setErrorServer(error[key]);

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


    return (
        <Dialog open={openModal} onClose={handleCloseModal}>
            <form onSubmit={handleSubmit(onSubmitData)} encType="multipart/form-data" noValidate>
                <DialogTitle align={'center'}>
                    {id ? 'Edit' : 'Create'} product
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
                                    name="product_name"
                                    defaultValue={product?.product_name || ''}
                                    label="Name"
                                    errors={Boolean(errors.product_name?.message)}
                                    helperText={errors.product_name?.message}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                            <div style={{paddingTop: '5px'}}>
                                <FileImageModalField
                                    Controller={Controller}
                                    control={control}
                                    defaultValue={product?.image || ''}
                                    name="image"
                                    register={register}
                                    errors={Boolean(errors.image?.message)}
                                    helperText={errors.image?.message}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                            <div style={{paddingTop: '5px'}}>
                                <TextModalField
                                    control={control}
                                    name="price"
                                    defaultValue={product?.price || ''}
                                    label="Price"
                                    errors={Boolean(errors.price?.message)}
                                    helperText={errors.price?.message}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <div style={{paddingTop: '5px'}}>
                                <CategoryModalSelect
                                    control={control}
                                    defaultValue={product?.category_id || ''}
                                    errors={Boolean(errors.category_id?.message)}
                                    helperText={errors.category_id?.message}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <div style={{paddingTop: '5px'}}>
                                <ManufacturerModalSelect
                                    control={control}
                                    defaultValue={product?.manufacturer_id || ''}
                                    errors={Boolean(errors.manufacturer_id?.message)}
                                    helperText={errors.manufacturer_id?.message}
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