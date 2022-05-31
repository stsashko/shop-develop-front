import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const ButtonWithLoading = ({color, fullWidth, disabled, type = 'submit', loading, variant='contained', children, ...props}) => {
    // sx={{mt: 3, mb: 2}} Sign In
    return (
        <LoadingButton
            { ...props }
            color={color}
            fullWidth={fullWidth}
            type={type}
            loading={loading}
            disabled={ disabled || loading }
            variant={variant}
        >
            {children}
        </LoadingButton>
    );
}

export default ButtonWithLoading;
