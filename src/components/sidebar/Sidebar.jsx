"use client"
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import InsertChartOutlinedSharpIcon from "@mui/icons-material/InsertChartOutlinedSharp";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import "./sidebar.scss";
import Link from 'next/link';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top">
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="logo text-red-800">Sparsha.</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>

          <p className="title">LISTS</p>
          <Link href="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <Person3OutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link href="/admin/foodproducts" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>food products</span>
            </li>
          </Link>
          <Link href="/admin/theaterproducts" style={{ textDecoration: "none" }}>
          <li>
            <LocalGroceryStoreOutlinedIcon className="icon" />
            <span>theater products</span>
          </li>
        </Link>
        <Link href="/admin/birthdayhallproducts" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>birthday hall products</span>
            </li>
          </Link>

          <Link href="" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>birthday hall orders</span>
            </li>
          </Link>
          <Link href="" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>resturent seat booking</span>
            </li>
          </Link>
          <Link href="" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>theater booking</span>
            </li>
          </Link>
          <Link href="/admin/orders" style={{ textDecoration: "none" }}>
          <li>
            <LocalGroceryStoreOutlinedIcon className="icon" />
            <span>food orders</span>
          </li>
        </Link>
          <p className="title">CHARTS</p>
          
          <Link href="" style={{ textDecoration: "none" }}>
            <li>
            <InsertChartOutlinedSharpIcon className="icon" />
              <span>stats</span>
            </li>
          </Link>
         
          <li>
            <ManageAccountsOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <CalendarMonthOutlinedIcon className="icon" />
            <span>Calendar</span>
          </li>

          <li>
            <ExitToAppOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
