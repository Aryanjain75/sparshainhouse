"use client";
import React, { useEffect, useState } from "react";
import Datatable from "@/components/datatable/Datatable";
import Sidebar from "@/components/sidebar/Sidebar";
import axios from "axios";
import "./customers.css";

const Customers = () => {
  const [users, setUsers] = useState([]);
  async function getData() {
    try {
      const response = await axios.get("/api/Registration");
      const usersData = response.data.message.users;
      setUsers(usersData);
    } catch (e: any) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="customers">
      <Sidebar />
      <div className="customersContainer" style={{marginTop:"3rem"}}>
        <Datatable data={users} />
      </div>
    </div>
  );
};

export default Customers;
