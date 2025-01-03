"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Chart from "@/components/chart/Chart";
import "./single.css";
import axios from "axios";
import List from "@/components/adminorders/order";

interface Data {
  _id: string;
  Name: string;
  Email: string;
  password: string;
  PhoneNumber: string;
  url: string;
  isVerified: boolean;
  isAdmin: boolean;
}

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  phoneNo: string;
  zipCode: string;
  country: string;
  user: string;
  createdAt: string;
}

interface UserData {
  data: Data;
  users: Address[];
}

interface SingleProps {
  params: {
    id: string;
  };
}

const Single: React.FC<SingleProps> = ({ params }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getData = async () => {
    try {
      const response = await axios.get(`/api/Registration/${params.id}`);
      const data = response.data.message;
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async (data: Partial<Data>) => {
    try {
      await axios.put(`/api/Registration/${params.id}`, data);
      getData(); // Refresh the data after update
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { data, users } = userData;

  const makeUser = () => {
    const updatedData = {
      ...data,
      isAdmin: false,
    };
    updateData(updatedData);
  };

  const makeAdmin = () => {
    const updatedData = {
      ...data,
      isAdmin: true,
    };
    updateData(updatedData);
  };

  const verify = () => {
    const updatedData = {
      ...data,
      isVerified: true,
    };
    updateData(updatedData);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <span className="editButton">Edit</span>

            <div className="item">
              <img src={data.url} alt={data.Name} className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.Name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{data.Email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">{data.PhoneNumber}</span>
                </div>
                <div className="detailItem flex flex-col gap-2">
                  <span className="itemKey">Status: </span>
                  <span className="itemValue">{data.isAdmin ? "Admin" : "User"}</span>
                  <button
                    className="bg-blue-800 text-white border-2 border-black p-1"
                    disabled={!data.isAdmin}
                    onClick={makeUser}
                  >
                    MAKE USER
                  </button>
                  <button
                    className="bg-red-800 text-white border-2 border-black p-1"
                    disabled={data.isAdmin}
                    onClick={makeAdmin}
                  >
                    MAKE ADMIN
                  </button>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Verified: </span>
                  <span className="itemValue">{data.isVerified ? "Verified" : "Not Verified"}</span>
                  <button
                    className="bg-blue-800 text-white border-2 border-black p-1"
                    onClick={verify}
                    disabled={data.isVerified}
                  >
                    Verify
                  </button>
                </div>
                {users.map((address) => (
                  <div key={address._id} className="detailItem">
                    <span className="itemKey">Address: </span>
                    <span className="itemValue">
                      {address.phoneNo} - {address.street}, {address.city}, {address.state} - {address.zipCode}, {address.country}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User's Spending (Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List email={data.Email} />
        </div>
      </div>
    </div>
  );
};

export default Single;
