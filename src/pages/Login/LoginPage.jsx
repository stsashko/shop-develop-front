import React, {useEffect, useRef, useState} from 'react';

import Avatar from '@mui/material/Avatar';
import {useForm, Controller} from "react-hook-form";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from "react-redux";
import {setAuthenticated, setUserAction} from "../../redux/actions/authActions";
import ButtonWithLoading from "../../components/ButtonWithLoading";

import {loginApi} from "../../api/authApi";

import {yupResolver} from "@hookform/resolvers/yup";
import validationSchema from "./validation";

import {Alert, AlertTitle} from "@mui/lab";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Link from "@mui/material/Link";

export default function LoginPage() {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);

    const formRef = useRef();

    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        setLoading(true);

        console.log(data);

        loginApi(data)
            .then((user) => {
                dispatch(setUserAction(user));
                dispatch(setAuthenticated());

                if (location.state?.from) {
                    navigate(location.state.from);
                }
            })
            .catch((error) => {
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
            })
            .finally(() => {
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
        // if (e.keyCode === 13) {
        //     handleSubmit(onSubmit);
        //     e.target.blur();
        // }
    };

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
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form noValidate onSubmit={handleSubmit(onSubmit)} ref={formRef}>

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
                                autoComplete="current-password"
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                onKeyDown={e => {
                                    handlePressEnter(e)
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="remember"
                        control={control}
                        defaultValue="1"
                        render={({field}) => (
                            <FormControlLabel
                                control={<Checkbox {...field} value="1" name="remember" color="primary"/>}
                                label="Remember me"
                            />

                        )}
                    />

                    {errorServer && (
                        <Alert severity="error">
                            {errorServer.map(item => <div key={item}>{item}</div>)}
                        </Alert>
                    )}

                    <ButtonWithLoading
                        sx={{mt: 3, mb: 2}}
                        fullWidth={true}
                        loading={loading}
                    >Sign In</ButtonWithLoading>

                    <div style={{textAlign:"center"}}><NavLink to="/register">Register</NavLink></div>

                </form>
            </Box>
        </Container>
    );
}
