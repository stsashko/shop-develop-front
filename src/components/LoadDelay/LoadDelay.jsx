import React from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import {setShowLoadDelay} from "../../redux/actions/loadDelayActions";
import {useDispatch, useSelector} from "react-redux";
// import loadDelayReducer from "../../redux/reducers/loadDelayReducer";

const LoadDelay = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loadDelayReducer.loading);

    const handleClose = () => {
        dispatch(setShowLoadDelay(false));
        // setOpen(false);
    };

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
