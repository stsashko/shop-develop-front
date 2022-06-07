import { createContext } from "react";

export const HeadContext = createContext({
    title: '',
    setTitle: () => {},
    titlePage: '',
    setTitlePage: () => {}
});