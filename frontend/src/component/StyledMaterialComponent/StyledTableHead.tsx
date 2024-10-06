"use client"
import TableHead from '@mui/material/TableHead';
import { styled, Theme } from '@mui/material/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledTableHead = styled(TableHead)(({ theme }: {theme: Theme }) => ({
    "& .MuiTableCell-root": {
        fontWeight: 800
    }
}));

export default StyledTableHead
