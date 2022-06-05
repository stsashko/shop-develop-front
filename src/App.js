import React, {useEffect} from "react";

import {Routes, Route} from 'react-router-dom';

import './App.css';

import LoginPage from "./pages/Login/LoginPage";
import Layout from "./components/Layouts/Layout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import {useDispatch, useSelector} from "react-redux";
import authReducer from "./redux/reducers/authReducer";
import {getUserAction, setLoading} from "./redux/actions/authActions";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
// import OrdersPage from "./pages/Orders/OrdersPage";
import CustomersPage from "./pages/Customers/CustomersPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import DeliveriesPage from "./pages/Deliveries/DeliveriesPage";
import ManufacturersPage from "./pages/Manufacturers/ManufacturersPage";
import ProductsPage from "./pages/Products/ProductsPage";
import PurchasesPage from "./pages/Purchases/PurchasesPage";
import StoresPage from "./pages/Stores/StoresPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import RegisterPage from "./pages/Register/RegisterPage";
import UsersPage from "./pages/Users/UsersPage";
import Page404 from "./pages/Page404";

function App() {
    const dispatch = useDispatch();

    const user = useSelector(({authReducer}) => ({
        authenticated: authReducer.authenticated,
        role: authReducer.user.role,
    }));

    const loading = useSelector(({authReducer}) => authReducer.loading);

    useEffect(() => {
        if(!user.authenticated)
            dispatch(getUserAction());
    },[user.authenticated]);

    if(loading)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', position: 'absolute' }}>
                <CircularProgress style={{
                    width: 100,
                    height: 100
                }} />
            </Box>
        );


    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/" element={<ProtectedRoutes/>}>
                <Route index element={<DashboardPage/>}/>
                <Route path="dashboard" element={<DashboardPage/>}/>
                {/*<Route path="orders" element={<OrdersPage/>}/>*/}
                <Route path="customers" element={<CustomersPage/>}/>
                <Route path="categories" element={<CategoriesPage/>}/>
                <Route path="deliveries" element={<DeliveriesPage/>}/>
                <Route path="manufacturers" element={<ManufacturersPage/>}/>
                <Route path="products" element={<ProductsPage/>}/>
                <Route path="purchases" element={<PurchasesPage/>}/>
                <Route path="stores" element={<StoresPage/>}/>
                <Route path="profile" element={<ProfilePage />}/>
                {user.role && <Route path="users" element={<UsersPage />}/>}
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default App;
