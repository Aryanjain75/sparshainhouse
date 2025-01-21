"use client"
import React,{useEffect, useState} from "react";
import ChartPage from "@/components/chart/linechart";
import Featured from "@/components/featured/Featured";
import List from "@/components/list/List";
import Sidebar from "@/components/sidebar/Sidebar";
import Widget from "@/components/widget/Widget";
import "@/components/home/home.css";
import axios from "axios";
import Order from "@/components/adminorders/Orders";

export default function Admin() {
  const [details,setdetails]=useState({
    customer:0,
    order:0,
    earn:0,
    myearn:0
  });
  async function fetchdata(){
    try{
      const resp=await axios.get("/api/widgetsupport");
      setdetails(resp.data.message);
      console.log(resp.data.message);
    }catch(e){
      console.error("Error fetching widget data:", e);
      setdetails({
        customer: 0,
        order: 0,
        earn:0,
        myearn:0
      });
    }
  }
  useEffect(()=>{
    fetchdata();
  },[])
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer mt-80">
        <div className="widgets">
          <Widget type="customer" value={details.customer}/>
          <Widget type="order" value={details.order}/>
          <Widget type="earnings" value={details.earn}/>
          <Widget type="balance" value={details.myearn}/>
        </div>
        <div className="charts">
          <Featured />
          <ChartPage />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Order/>
          </div>
      </div>
    </div>
  );
}
