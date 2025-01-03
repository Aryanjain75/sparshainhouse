"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import "./product.css";
import Productable from "../../../components/birthdayhallproductable/Productable";
import Link from 'next/link';

function Product ()  {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer mt-20">
        <div className="productList" style={{marginTop:"7rem"}}>
        <div className="datatableTitle">
            <span>Add New Product</span>
            <Link className="link" href="/admin/birthdayhallproducts/new" >
              Add New
            </Link>
          </div>
        </div>
        <Productable />
      </div>          

    </div>
  );
};

export default Product;
