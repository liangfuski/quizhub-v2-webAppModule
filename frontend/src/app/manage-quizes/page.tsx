import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import StyledTableHead from '@/component/StyledMaterialComponent/StyledTableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getQuizListByCondition } from '@/api/route';
import { Quiz } from '@/utils/type';
import Box from '@mui/material/Box';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import  IconButton from '@mui/material/IconButton'; 
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { ThemeColor } from '@/utils/Constant';
import Link from 'next/link';

export default async function ManageQuizPage() {

    const id = "admin";
    const quizList = await getQuizListByCondition({ author: id });

    return ( 
      <TableContainer component={Paper} sx={{ mt: 10 }} elevation={1}>
        <Table
             sx={{ minWidth: 650 }}
             aria-label="simple table"
        >
          <StyledTableHead>
            <TableRow>
              <TableCell>Quiz Title</TableCell>
              <TableCell align="left">Auth</TableCell>
              <TableCell align="left">Desription</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {quizList.map((row: Quiz) => (
              <TableRow
                key={row._id}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                        ".MuiTableCell-root": {
                            borderColor: "primary.light"
                        }
                    },
                    '&:last-child:hover': {
                        "th, td": {
                            borderBottom: 1,
                            borderColor: "primary.light"
                        }
                    }
                }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="left">{row.author}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell 
                    align="right">
                    <Box>
                    <Link href={`/manage-quizes/${row._id}`}>
                        <IconButton aria-label="edit">
                            <ModeEditOutlineTwoToneIcon sx={{color: ThemeColor.primary_main}}/>
                        </IconButton>
                    </Link>
                    <IconButton aria-label="edit">
                        <DeleteForeverTwoToneIcon sx={{color: ThemeColor.status_danger}}/>
                    </IconButton>
                    </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) 
} 