import { useContext } from "react";
import { HeadContext } from "./../../contexts/HeadContext";

function useHead() {
    return useContext(HeadContext);
}

export default useHead;
