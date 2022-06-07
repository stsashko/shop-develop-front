import React, {useEffect} from "react";
import {Helmet, HelmetProvider} from 'react-helmet-async';
import useHead from "./../hooks/useHead";

export const Content = ({children, title = '', titlePage = ''}) => {
    const head = useHead();

    useEffect(() => {
        head.setTitlePage(titlePage);
    }, [titlePage]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </HelmetProvider>
    )
}
