import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useForm, Controller} from "react-hook-form";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useDispatch} from "react-redux";
import {registerAction} from "../../redux/actions/authActions";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import {useEffect, useRef, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import {Alert} from "@mui/lab";
import {NavLink, useNavigate} from "react-router-dom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {FormControl, FormHelperText} from "@mui/material";

export default function RegisterPage() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [errorServer, setErrorServer] = useState(false);

    const [addAvatar, setAddAvatar] = useState(false);

    const formRef = useRef();

    const navigate = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
        setError,
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const avatarField = register('file', { required: true });

    const onSubmit = (data) => {
        setLoading(true);
        dispatch(registerAction(data)).then((res) => {
            navigate('/');
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
            reset();
            setLoading(false);
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorServer(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [errorServer])

    const handlePressEnter = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(formRef);
            e.target.blur();
        }
    };

    const handleFileChange = () => {
        setAddAvatar(true);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <HowToRegIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form noValidate onSubmit={handleSubmit(onSubmit)} ref={formRef} encType="multipart/form-data">
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                error={Boolean(errors.name?.message)}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <TextField
                                {...field}
                                margin="normal"
                                type="email"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="password"
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                onKeyDown={e => {
                                    handlePressEnter(e)
                                }}
                            />
                        )}
                    />
                    <FormControl error={Boolean(errors.file?.message)}>
                        <Button
                                variant="outlined"
                                component="label"
                                size="small"
                                sx={{mt: 2, maxWidth: '100px'}}
                                startIcon={addAvatar ? <AddPhotoAlternateIcon /> : null}
                        >
                            Avatar
                            <input type="file" name="file" {...avatarField} onChange={(e) => {
                                avatarField.onChange(e);
                                handleFileChange(e);
                            }} hidden />
                        </Button>
                        <FormHelperText />

                        <FormHelperText error={Boolean(errors.file?.message)}>
                            {errors.file?.message}
                        </FormHelperText>
                    </FormControl>
                    {errorServer && (
                        <Alert severity="error">
                            {errorServer.map(item => <div key={item}>{item}</div>)}
                        </Alert>
                    )}
                    <ButtonWithLoading
                        sx={{mt: 3, mb: 2}}
                        fullWidth={true}
                        loading={loading}
                    >Register now</ButtonWithLoading>
                    <div style={{textAlign:"center"}}><NavLink to="/login">Sign In</NavLink></div>
                </form>
            </Box>
        </Container>
    );
}
