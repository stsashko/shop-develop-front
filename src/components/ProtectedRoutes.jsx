import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import Layout from "./Layouts/Layout";

const ProtectedRoutes = () => {
    const isAuth = useSelector(({authReducer}) => authReducer.authenticated);

    const location = useLocation();

    return isAuth ? (
        <Layout />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default ProtectedRoutes;