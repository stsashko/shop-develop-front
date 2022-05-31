import React, {useEffect, useMemo, useRef, useState} from "react";

import TextField from '@mui/material/TextField';
import {errorHelper} from "../../errorHelper";

const TextFieldValidator = ({error, helperText, validators, errorMessages, handleError, runValidator, ...props}) => {

    // validators={['required', 'isEmail']}
    // errorMessages={['this field is required', 'email is not valid']}
    const [load, setLoad] = useState(false);
    const [changed, setChange] = useState(false);
    const [isError, setError] = useState(false);

    const [messagesError, setMessagesError] = useState([]);

    // let errorValidator = new errorHelper(validators, errorMessages);

    const errorValidator = useMemo(() => {
        return new errorHelper(validators, errorMessages);
    }, [load]);


    const textRef = useRef();

    useEffect(() => {
        if(runValidator) {
            let check = errorValidator.check(textRef.current.value);
            setError(check);
            setMessagesError(errorValidator.getMessagesError());
            handleError(check);
        }
        // setLoad(true);
    }, [runValidator])


    const handleBlur = (event) => {
        const {value} = event.target;
        if(value !== '' || changed) {
            setChange(true);

            let check = errorValidator.check(value);
            setError(check);
            setMessagesError(errorValidator.getMessagesError());
            handleError(check);
        }
    }

    const handleChange = (event) => {
        const {value} = event.target;

        if(changed) {
            let check = errorValidator.check(value);
            setError(check);
            setMessagesError(errorValidator.getMessagesError());
            handleError(check);
        }
    }

    return (
        <TextField
            {...props}
            error={isError || error}
            helperText={isError ? messagesError.map(item => `* ${item}`).join(' ') : ''}
            onBlur={handleBlur}
            onChange={handleChange}
            inputRef={textRef}
        />
    );
}

export default TextFieldValidator;
