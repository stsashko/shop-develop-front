import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {NavLink, useNavigate} from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {Menu, MenuItem} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {
    LOGOUT_ROUTE,
    PROFILE_ROUTE
} from "../RouterConstants";
import {logOutAction} from './../../redux/actions/authActions';
import {useDispatch, useSelector} from "react-redux";
import {logOutApi} from "../../api/authApi";
import {setShowLoadDelay} from "../../redux/actions/loadDelayActions";
import useHead from "./../../hooks/useHead";

export default ({open, drawerWidth, toggleDrawer}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authReducer.user);
    const head = useHead();
    const menuSettings = [
        {title: 'Profile', path: PROFILE_ROUTE},
        {title: 'Logout', path: LOGOUT_ROUTE}
    ];
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        if (anchorElUser === null) {
            setAnchorElUser(event.currentTarget)
        } else {
            setAnchorElUser(null)
        }

    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        handleCloseUserMenu();

        dispatch(setShowLoadDelay(true));

        logOutApi()
            .then((data) => {
                dispatch(logOutAction());
                navigate('/');
            })
            .catch()
            .finally(() => {
                dispatch(setShowLoadDelay(false));
            });
    }

    return (
        <AppBar position="absolute" open={open} sx={open ? {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`
        } : null}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1}}
                >
                    {head.titlePage}
                </Typography>
                <Box>
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0, display: 'inline-block'}}>
                        <Avatar alt={user.name} src={user.avatar}/>
                    </IconButton>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {menuSettings.map((setting) => {
                            if (setting.title !== 'Logout')
                                return (
                                    <MenuItem key={setting.title} to={setting.path} component={NavLink}
                                              onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting.title}</Typography>
                                    </MenuItem>
                                );
                            else
                                return (
                                    <MenuItem key={setting.title} onClick={handleLogOut}>
                                        <Typography textAlign="center">{setting.title}</Typography>
                                    </MenuItem>
                                )

                        })}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}