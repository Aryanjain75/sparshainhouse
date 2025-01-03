'use client';

import React,{useContext} from "react";
import Link from "next/link"; // Correct import for Next.js Link component
import { UsernameContext } from '@/context/UserContext';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const {username, setUsername, isAuth, isAdmin,signOut,loadUserData } = useContext(UsernameContext);
  const router = useRouter();
  const LOGOUT =async()=>{
    try{
       signOut();
      await axios.get("/api/logout");
      router.push("/");

    }
      catch(e:any){
        toast.error(e);
      }
  }
  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar gap-2 flex flex-col">
      <li className="p-4 border-1 border-black rounded-[1rem] font-extrabold" style={{background: "linear-gradient(45deg, #8e8bff, transparent)"}}>
          <Link href="/profile">
              Profile
          </Link>
        </li>
        <li className="p-4 border-1 border-black rounded-[1rem] font-extrabold" style={{background: "linear-gradient(45deg, #8e8bff, transparent)"}}>
          <Link href="/profile/orders">
              Orders
          </Link>
        </li>
        <li className="p-4 border-1 border-black rounded-[1rem] font-extrabold" style={{background: "linear-gradient(45deg, #8e8bff, transparent)"}}>
          <Link href="/profile/update">
              Update Profile
          </Link>
        </li>
        <li className="p-4 border-1 border-black rounded-[1rem] font-extrabold" style={{background: "linear-gradient(45deg, #8e8bff, transparent)"}}>
          <Link href="/profile/updatepassword">
              Update Password
          </Link>
        </li>

        <li className="p-4 border-1 border-black rounded-[1rem] font-extrabold gradient-background hover:br-red">
        <div onClick={LOGOUT} className="block px-3 py-2 hover:text-white-500 rounded-md cursor-pointer">
            Logout
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
