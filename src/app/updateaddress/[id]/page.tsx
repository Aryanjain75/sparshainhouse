"use client";
import React, { useContext, useEffect, useState } from "react";
import UpdateAddress from "@/components/user/UpdateAddress";
import { UsernameContext } from "@/context/UserContext";

const UpdateAddressPage = ({ params }: { params: any }) => {
  const { Address } = useContext(UsernameContext);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (Address && Address.length > 0) {
      const foundAddress = Address[0].find((addr: any) => addr._id === params.id);
      setAddress(foundAddress);
    }
  }, [Address, params.id]);

  if (!address) {
    return <div>Loading...</div>;
  }

  return <UpdateAddress id={params.id} address={address} />;
};

export default UpdateAddressPage;
