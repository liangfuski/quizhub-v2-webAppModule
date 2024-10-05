"use client"
import Button, { ButtonProps } from '@mui/material/Button';

interface ExtendedButtonProps extends ButtonProps{}

export default function CustomButton(props: ExtendedButtonProps){
    return (
        <Button {...props}/>
    )
}