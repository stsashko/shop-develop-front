import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import TopHeader from './TopHeader';
import Sidebar from "./Sidebar";
import { isMobile } from 'react-device-detect';
const drawerWidth = 240;

const Header = () => {
    const [open, setOpen] = React.useState(!isMobile);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <TopHeader open={open} drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
            <Sidebar open={open} drawerWidth={drawerWidth} toggleDrawer={toggleDrawer}  />
        </React.Fragment>
    );
}

export default Header;