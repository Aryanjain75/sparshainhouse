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
import Link from 'next/link';

function Sidebar() {
  return (
    <div className="sidebar bg-gray-900 text-white min-h-screen w-64 py-6 px-4">
      <div className="top mb-8">
        <Link href="/" className="block">
          <span className="logo text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Sparsha.
          </span>
        </Link>
      </div>
      <hr className="border-gray-700 mb-6" />
      <div className="bottom">
        <ul className="space-y-6">
          <div className="mb-4">
            <p className="title text-gray-400 text-xs uppercase font-semibold mb-3">MAIN</p>
            
            <Link href="/admin" className="block">
                <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all">
                <DashboardIcon className="icon text-gray-400" />
                <span className="text-sm">Dashboard</span>
                </li>
              </Link>

          </div>

          <div className="mb-4">
            <p className="title text-gray-400 text-xs uppercase font-semibold mb-3">LISTS</p>
            <div className="space-y-2">
              <Link href="/admin/users" className="block">
                <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all">
                  <Person3OutlinedIcon className="icon text-gray-400" />
                  <span className="text-sm">Users</span>
                </li>
              </Link>

              <Link href="/admin/foodproducts" className="block">
                <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all">
                  <LocalGroceryStoreOutlinedIcon className="icon text-gray-400" />
                  <span className="text-sm capitalize">Food Products</span>
                </li>
              </Link>

              <Link href="/admin/theaterproducts" className="block">
                <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all">
                  <LocalGroceryStoreOutlinedIcon className="icon text-gray-400" />
                  <span className="text-sm capitalize">Theater Products</span>
                </li>
              </Link>

              <Link href="/admin/birthdayhallproducts" className="block">
                <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all">
                  <LocalGroceryStoreOutlinedIcon className="icon text-gray-400" />
                  <span className="text-sm capitalize">Birthday Hall Products</span>
                </li>
              </Link>

              <Link href="/admin/orders" className="block">
                <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all">
                  <LocalGroceryStoreOutlinedIcon className="icon text-gray-400" />
                  <span className="text-sm capitalize">Orders</span>
                </li>
              </Link>


              
              <Link href="/admin/RestroSeatBooking" className="block">
                <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all">
                  <LocalGroceryStoreOutlinedIcon className="icon text-gray-400" />
                  <span className="text-sm capitalize">Restro SeatBooking</span>
                </li>
              </Link>


            </div>
          </div>

          <div className="mb-4">
            <p className="title text-gray-400 text-xs uppercase font-semibold mb-3">CHARTS</p>
            <Link href="" className="block">
              <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all">
                <InsertChartOutlinedSharpIcon className="icon text-gray-400" />
                <span className="text-sm capitalize">Stats</span>
              </li>
            </Link>
          </div>

          <div className="mt-auto space-y-2">
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all cursor-pointer">
              <ManageAccountsOutlinedIcon className="icon text-gray-400" />
              <span className="text-sm">Profile</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all cursor-pointer">
              <CalendarMonthOutlinedIcon className="icon text-gray-400" />
              <span className="text-sm">Calendar</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-red-500">
              <ExitToAppOutlinedIcon className="icon" />
              <span className="text-sm">Logout</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
