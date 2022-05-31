import { useCallback, useEffect, useMemo, useState } from "react";

import { HeadContext } from "./../contexts/HeadContext";


function HeadProvider(props) {

    const [title, setTitle] = useState(false);
    const [titlePage, setTitlePage] = useState(null);

    // const setToken = useCallback((tokenData) => {
    //     setTokenData(tokenData);
    //
    //     if (tokenData) {
    //         Cookies.set("auth-token", tokenData);
    //     } else {
    //         Cookies.remove("auth-token");
    //     }
    // }, []);


    // const loadData = useCallback(async () => {
    //     const tokenData = Cookies.get("auth-token");
    //     setTokenData(tokenData);
    //
    //     try {
    //         if (tokenData) {
    //             const { data } = await api.auth.getProfile();
    //             setUser(data);
    //         }
    //     } catch {
    //         setToken(null);
    //     } finally {
    //         setIsLoaded(true);
    //     }
    // }, [setToken]);

    // useEffect(() => {
    //     loadData();
    // }, [loadData]);

    const contextValue = useMemo(
        () => ({
            title,
            setTitle,
            titlePage,
            setTitlePage,
        }),
        [title, setTitle, titlePage, setTitlePage]
    );


    // const contextValue = {
    //     title,
    //     setTitle,
    //     titlePage,
    //     setTitlePage,
    // };


    return (
        <HeadContext.Provider value={contextValue}>
            {props.children}
        </HeadContext.Provider>
    );
}

export default HeadProvider;
