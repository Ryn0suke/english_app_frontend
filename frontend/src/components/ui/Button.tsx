import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface CommonButtonProps extends ButtonProps {
    onClick: ((...args: any[]) => any);
    children: React.ReactNode;
    type?: 'button' | 'submit';
}

const StyledButton = styled(Button)(({ theme, color }) => ({
    background: color === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main,
    color: 'white',
    '&:hover': {
        background: color === 'primary' ? theme.palette.primary.dark : theme.palette.secondary.dark,
    },
    margin: theme.spacing(1),
    padding: theme.spacing(1, 2),
    borderRadius: '8px',
}));

const CommonButton: React.FC<CommonButtonProps> = ({ onClick, children, variant = 'contained', color = 'primary', type = 'button', ...props }) => {

    return (
        <StyledButton onClick={onClick} variant={variant} color={color} type={type} {...props}>
            {children}
        </StyledButton>
    );
};

export default CommonButton;
