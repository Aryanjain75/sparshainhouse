import React from "react";
import ChartPage from "@/components/chart/linechart";
import Featured from "@/components/featured/Featured";
import List from "@/components/list/List";
import Sidebar from "@/components/sidebar/Sidebar";
import Widget from "@/components/widget/Widget";
import "@/components/home/home.css";

export default function Admin() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer mt-80">
        <div className="widgets">
          <Widget type="customer" />
          <Widget type="order" />
          <Widget type="earnings" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <ChartPage />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
}
