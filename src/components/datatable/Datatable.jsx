"use client"
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { Box, Badge } from "@chakra-ui/react";
import axios from 'axios';
import "./datatable.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Datatable = ({ data }) => {
  const [Data, setData] = useState([]);
  const router=useRouter(); 
  useEffect(() => {
    const formattedData = data.map(item => ({
      id: item._id,
      username: item.Name,
      img: item.url,
      email: item.Email,
      status: `${item.isAdmin ? "Admin" : "User"}${item.isVerified ? " (Verified)" : " (Not Verified)"}`,
      age: item.age,
      addresses: item.addresses
    }));
    setData(formattedData);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Registration?id=${id}`);
      const response = await axios.get("/api/registration");
      const data = response.data.message.users;
      const formattedData = data.map(item => ({
        id: item._id,
        username: item.Name,
        img: item.url,
        email: item.Email,
        status: `${item.isAdmin ? "Admin" : "User"}${item.isVerified ? " (Verified)" : " (Not Verified)"}`,
        age: item.age,
        addresses: item.addresses
      }));
      setData(formattedData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleView = (user) => {
    router.push(`/admin/users/${user.id}`);
  };



  const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">
            <Image
              className="border-2 border-black rounded-md mr-[12px]"
              style={{ width: "27px", marginRight: "12px" }}
              name={params.row.username}
              src={params.row.img}
              alt={params.row.username}
            />
            {params.row.username}
          </Box>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const statusColor = params.row.status.includes("Verified") ? "text-green" : "text-red";
        return (
          <Badge className={statusColor} variant="solid">
            {params.row.status}
          </Badge>
        );
      },
    },
    {
      field: "Views",
      headerName: "Views",
      width: 200,
      renderCell: (params) => {
        return (
          <Box display="flex" gap="10px" >
            <button  className="border-2 border-black cursor-pointer p-1.5 bg-gradient-to-r from-[#0f0d6b] to-[#00ff2e] w-28 text-black" style={{
              padding: '6px',
              background: 'linear-gradient(45deg, #0f0d6b, #00ff2e)',
              width: '7rem',
              color: 'black'
            }} onClick={() => handleView(params.row)}>
              View
            </button>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Box display="flex" className="justify-center"  gap="10px">
            <button className="text-white  border-2 border-black cursor-pointer" style={{
              padding: '6px',
              background: 'linear-gradient(45deg, rgb(15, 13, 107), rgb(255, 0, 0))',
              width: '7rem',
              color: 'black'
            }} onClick={() => handleDelete(params.row.id)}>
              Delete
            </button>
          </Box>
        );
      },
    },
  ];

  return (
    <div className="datatable mt-[4rem]" >
      
      <DataGrid
        className="datagrid"
        rows={Data}
        columns={userColumns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
