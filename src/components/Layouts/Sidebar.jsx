import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from '@mui/icons-material/Category';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import {useSelector} from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import {
    CATEGORIES_ROUTE, CUSTOMERS_ROUTE, DASHBOARD_ROUTE, DELIVERIES_ROUTE, MANUFACTURERS_ROUTE, PRODUCTS_ROUTE, PURCHASES_ROUTE, STORES_ROUTE, USERS_ROUTE
} from "../RouterConstants";

const menuMain = [
    {title: 'Dashboard', Icon: <DashboardIcon/>, path: DASHBOARD_ROUTE,},
    {title: 'Customers', Icon: <PeopleIcon/>, path: CUSTOMERS_ROUTE},
    {title: 'Categories', Icon: <CategoryIcon/>, path: CATEGORIES_ROUTE},
    {title: 'Deliveries', Icon: <LocalShippingIcon/>, path: DELIVERIES_ROUTE},
    {title: 'Manufacturers', Icon: <BusinessIcon/>, path: MANUFACTURERS_ROUTE},
    {title: 'Products', Icon: <ListAltIcon/>, path: PRODUCTS_ROUTE},
    {title: 'Purchases', Icon: <AddShoppingCartIcon/>, path: PURCHASES_ROUTE},
    {title: 'Stores', Icon: <StoreIcon/>, path: STORES_ROUTE},
];

const secondMenu = [
    {title: 'Users', Icon: <PeopleOutlineIcon/>, path: USERS_ROUTE}
];

export default ({open, drawerWidth, toggleDrawer}) => {

    const role = useSelector(({authReducer}) => authReducer.user.role);

    const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
        ({theme, open}) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );

    const {pathname} = useLocation();

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">
                {menuMain.map(item => (
                    <ListItemButton key={item.title} to={item.path} component={NavLink} selected={pathname === `/${item.path}`}>
                        <ListItemIcon>
                            {item.Icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title}/>
                    </ListItemButton>
                ))}
                {role === 1 && (
                    <React.Fragment>
                        <Divider sx={{my: 1}}/>
                        {secondMenu.map(item => (
                            <ListItemButton key={item.title} to={item.path} component={NavLink} selected={pathname === `/${item.path}`}>
                                <ListItemIcon>
                                    {item.Icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItemButton>
                        ))}
                    </React.Fragment>
                )}
            </List>
        </Drawer>
    );
}