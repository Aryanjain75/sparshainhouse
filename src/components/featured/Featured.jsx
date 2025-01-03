"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";
import './featured.scss'; // Ensure you have the styles in this CSS file

function Featured() {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <ChangingProgressProvider
            values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          >
            {(percentage) => (
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathTransitionDuration: 0.95,
                  trailColor: "#82ca9d",
                  pathColor: "#210876",
                  textColor: "#210876",
                })}
              />
            )}
          </ChangingProgressProvider>
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">Rs.2042.50K</p>
        <p className="desc">Previous transactions</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
              <div className="resultAmount">Rs.19.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
              <div className="resultAmount">Rs.60.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult negative">
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
              <div className="resultAmount">Rs.73.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
