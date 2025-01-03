import React, { useContext,useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  MoreVertical,
} from "lucide-react";
import { UsernameContext } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Address {
  _id: string;
  user: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNo: string;
}

interface UserAddressesProps {
  addresses: Address[][];
}

const UserAddresses: React.FC<UserAddressesProps> = ({ addresses }) => {
  const nestedAddresses = addresses[0]; // Accessing the first nested array
  const userContext = useContext(UsernameContext);
  const { loadUserData } = userContext;
  const [error,seterror]=useState("");
  const deleteAddress = async (id: string) => {
    try {
      const response = await axios.delete("/api/address", { data: { id } });
      loadUserData();
      seterror("Address deleted successfully");
      setTimeout(()=>{seterror("")},3000);
    } catch (e: any) {
      seterror("Error deleting address: " + e.message);
    }
  };
  
  return (
    <div>
      {nestedAddresses?.map((address) => (
        <div key={address._id}>
          <div className="mb-5 gap-4">
            <figure className="w-full flex items-center bg-gray-100 p-4 rounded-md cursor-pointer">
              <div className="mr-3">
                <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
                  <i className="fa fa-map-marker-alt"></i>
                </span>
              </div>
              <figcaption className="text-gray-600 flex justify-between w-[100%]">
                <p>
                  {address.street} <br /> {address.city}, {address.state},{" "}
                  {address.zipCode}, {address.country}
                  <br />
                  Phone no: {address.phoneNo}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/updateaddress/${address._id}`}><DropdownMenuItem>UPDATE</DropdownMenuItem></Link>
                    <DropdownMenuItem onClick={() => deleteAddress(address._id)}>DELETE</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </figcaption>
            </figure>
          </div>
        </div>
      ))}
      <div className="text-red-700 font-semibold">{error}</div>
    </div>
  );
};

export default UserAddresses;
