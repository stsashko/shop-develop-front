import React, {useEffect, useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import {Content} from "../../components/Content";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@mui/lab";
import {updateProfileAction} from "../../redux/actions/profileActions";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const [loading, setLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const fileReg = register('file');
    const fileRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorServer(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [errorServer])

    const onSubmit = (data) => {
        setLoading(true);
        dispatch(updateProfileAction(data)).then((res) => {

        }).catch((error) => {
            if (typeof error[0] === 'undefined') {
                Object.keys(error).forEach((key) => {
                    if (key === 'file')
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
            fileRef.current.value = null;
            setLoading(false);
        });
    };

    return (
        <Content title="Profile" titlePage="Edit profile">
            <Box
                component="form"
                enctype="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '100%', maxWidth: 500, margin: '20px 0', display: 'flex'},
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} sx={{justifyContent: 'center'}}>
                        <Card sx={{maxWidth: 200, margin: '0 auto'}}>
                            <CardMedia
                                component="img"
                                image={user.avatar}
                                alt="green iguana"
                            />
                            <CardActions sx={{justifyContent: 'center'}}>
                                <Button variant="outlined" component="label" size="small">
                                    Change
                                    <input type="file" name="file"
                                           onChange={fileReg.onChange}
                                           onBlur={fileReg.onBlur}
                                           name={fileReg.name}
                                           ref={(ref) => {
                                               fileRef.current = ref;
                                               fileReg.ref(ref);
                                           }}
                                            hidden
                                    />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={user.name}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    name="name"
                                    fullWidth
                                    sx={{marginTop: '0 !important'}}
                                    error={Boolean(errors.name?.message)}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={user.email}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    error={Boolean(errors.email?.message)}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="on"
                                    fullWidth
                                    error={Boolean(errors.password?.message)}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        {errorServer.length > 0 && (
                            <Alert severity="error" sx={{mb: '20px'}}>
                                {errorServer.map(item => <div key={item}>{item}</div>)}
                            </Alert>
                        )}
                        <ButtonWithLoading
                            loading={loading}
                        >Save</ButtonWithLoading>
                    </Grid>
                </Grid>
            </Box>

        </Content>
    );
}

export default ProfilePage;