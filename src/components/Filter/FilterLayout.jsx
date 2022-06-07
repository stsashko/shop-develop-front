import React from "react";
import Grid from "@mui/material/Grid";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import ButtonWithLoading from "../ButtonWithLoading";
import Paper from "@mui/material/Paper";

export const FilterLayout = ({setPage, filter, setFilter, loading, setLoading, children, resetFields}) => {
    const {
        control,
        register,
        setValue,
        handleSubmit,
        reset
    } = useForm();

    const onSubmitFilter = (data) => {
        setLoading(true);
        setPage(0);
        setFilter({
            ...filter,
            ...data
        });
    };

    const handleReset = () => {
        setLoading(true);
        setPage(0);
        setFilter({
            ...filter,
            ...resetFields
        });
        reset();
    }

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { control, register, setValue });
        }
        return child;
    });

    return (
        <Paper sx={{mb: '20px'}}>
            <form onSubmit={handleSubmit(onSubmitFilter)}>
                <Grid container spacing={2} sx={{pr: '16px', pl: '16px', pb: '16px'}}>
                    {childrenWithProps}

                    <Grid item xs={12} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            sx={{
                                mr: '15px'
                            }}
                            onClick={handleReset}
                            type="button"
                            disabled={loading}
                        >Reset</Button>
                        <ButtonWithLoading
                            loading={loading}
                        >Filter</ButtonWithLoading>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}