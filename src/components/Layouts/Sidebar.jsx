import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from '@mui/icons-material/Category';
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from '@mui/icons-material/Business';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
// import {Route} from "react-router-dom";
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
    CATEGORIES_ROUTE,
    CUSTOMERS_ROUTE,
    DASHBOARD_ROUTE,
    DELIVERIES_ROUTE,
    MANUFACTURERS_ROUTE,
    ORDERS_ROUTE, PRODUCTS_ROUTE, PURCHASES_ROUTE, STORES_ROUTE
} from "../RouterConstants";

// <Route path="orders" element={<Orders />} />
// <Route path="customers" element={<Customers />} />
// <Route path="categories" element={<Categories />} />
// <Route path="deliveries" element={<Deliveries />} />
// <Route path="manufacturers" element={<Manufacturers />} />
// <Route path="products" element={<Products />} />
// <Route path="purchases" element={<Purchases />} />
// <Route path="stores" element={<Stores />} />


const menuMain = [
    {title: 'Dashboard', Icon: <DashboardIcon/>, path: DASHBOARD_ROUTE,},
    // {title: 'Orders', Icon: <ShoppingCartIcon/>, path: ORDERS_ROUTE},
    {title: 'Customers', Icon: <PeopleIcon/>, path: CUSTOMERS_ROUTE},
    {title: 'Categories', Icon: <CategoryIcon/>, path: CATEGORIES_ROUTE},
    {title: 'Deliveries', Icon: <LocalShippingIcon/>, path: DELIVERIES_ROUTE},
    {title: 'Manufacturers', Icon: <BusinessIcon/>, path: MANUFACTURERS_ROUTE},
    {title: 'Products', Icon: <ListAltIcon/>, path: PRODUCTS_ROUTE},
    {title: 'Purchases', Icon: <AddShoppingCartIcon/>, path: PURCHASES_ROUTE},
    {title: 'Stores', Icon: <StoreIcon/>, path: STORES_ROUTE},
];

// const secondMenu = [
//     {title: 'Current month', Icon: <AssignmentIcon/>},
//     {title: 'Last quarter', Icon: <AssignmentIcon/>},
//     {title: 'Year-end sale', Icon: <AssignmentIcon/>},
// ];

export default ({open, drawerWidth, toggleDrawer}) => {

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
// pathname: '/dashboard'
//     console.log(location);

    // selected={selectedIndex === 1}

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

                    // component={ NavLink }
                    // to={ menu_item.path }

                    <ListItemButton key={item.title} to={item.path} component={NavLink} selected={pathname === `/${item.path}`}>
                        <ListItemIcon>
                            {item.Icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title}/>
                    </ListItemButton>
                ))}

                {/*<Divider sx={{my: 1}}/>*/}
                {/*{secondMenu.map(item => (*/}
                {/*    <ListItemButton key={item.title}>*/}
                {/*        <ListItemIcon>*/}
                {/*            {item.Icon}*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary={item.title}/>*/}
                {/*    </ListItemButton>*/}
                {/*))}*/}

            </List>
        </Drawer>
    );
}
