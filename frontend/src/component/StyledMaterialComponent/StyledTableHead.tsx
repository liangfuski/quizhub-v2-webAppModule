"use client"
import TableHead from '@mui/material/TableHead';
import { styled, Theme } from '@mui/material/styles';

const StyledTableHead = styled(TableHead)(({ theme }: {theme: Theme }) => ({
    "& .MuiTableCell-root": {
        fontWeight: 800
    }
}));

export default StyledTableHead
