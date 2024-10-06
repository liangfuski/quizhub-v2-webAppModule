"use client"
import Button, { ButtonProps } from '@mui/material/Button';

// interface ExtendedButtonProps extends ButtonProps{}

export default function CustomButton(props: ButtonProps){
    return (
        <Button {...props}/>
    )
}