import React from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import { useSelector} from "react-redux";

const LoadDelay = () => {
    const loading = useSelector((state) => state.loadDelayReducer.loading);
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={null}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default LoadDelay;