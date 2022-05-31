import React, {useEffect, useMemo} from "react";
// import {Helmet} from "react-helmet";
import {Helmet, HelmetProvider} from 'react-helmet-async';
import useHead from "./../hooks/useHead";

export const Content = ({children, title = '', titlePage = '', ...props}) => {
    const head = useHead();

    useEffect(() => {
        head.setTitlePage(titlePage);
    }, [titlePage]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                {/*<link rel="canonical" href="https://www.tacobell.com/" />*/}
            </Helmet>
            {children}
        </HelmetProvider>
    )
}
