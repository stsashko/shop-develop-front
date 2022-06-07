import { useMemo, useState } from "react";

import { HeadContext } from "./../contexts/HeadContext";

function HeadProvider(props) {
    const [title, setTitle] = useState(false);

    const [titlePage, setTitlePage] = useState(null);

    const contextValue = useMemo(
        () => ({
            title,
            setTitle,
            titlePage,
            setTitlePage,
        }),
        [title, setTitle, titlePage, setTitlePage]
    );

    return (
        <HeadContext.Provider value={contextValue}>
            {props.children}
        </HeadContext.Provider>
    );
}

export default HeadProvider;