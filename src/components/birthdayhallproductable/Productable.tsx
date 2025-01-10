"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import "./productable.scss";
import Link from "next/link";
import Image from "next/image";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
interface Decoration{
  delivery:{
    processingTime:{hours:number},
    slots:Array<any>,
  },
  media:{
    primary:{
      defaultAlt:string,
      url:string
    }
  },
  name:string,
  price:{
    price:number,
    mrp:number
  },
  quality:{
    ratting:{
      count:Number,
      valur:any
    }
  }
  sku:string,
  slotTypes:any,
  slug:string,
  type:string,
  _id:string
}
export default function Productable() {
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await axios.get(`/api/BirthdayhallDecoration?start=${page * rowsPerPage}&end=${(page + 1) * rowsPerPage}&name=${""}`);
        if (data.status === 200) {
          console.log(data);
          setTotal(data.data.totallength);
          setResponse(data.data.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, rowsPerPage]);

  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Decoration Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Discounted Price</TableCell>
            <TableCell align="right">View</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response.map((row:Decoration) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="flex text-center align-middle items-center gap-2">
                <img src={row.media.primary.url} alt={row.media.primary.defaultAlt} className="rounded-full" style={{width:"50px"}} /><div>{row.name}</div>
              </TableCell>
              <TableCell align="right">{row.price.price}</TableCell>
              <TableCell align="right">{row.price.mrp}</TableCell>
              <TableCell align="right"><Button variant="outlined" href="#outlined-buttons" startIcon={<UpdateIcon/>}>
  Update
</Button></TableCell>
              <TableCell align="right"><Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
