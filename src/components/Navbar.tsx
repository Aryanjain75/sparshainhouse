/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { CartContext } from "@/context/CartContext";
import { useRouter } from 'next/navigation';
import { UsernameContext } from '@/context/UserContext';
import axios from "axios";
import { DarkModeContext } from "@/context/darkModeContext";
import { Separator } from "@/components/ui/separator"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const { username, setUsername, isAuth, isAdmin, signOut, loadUserData } = useContext(UsernameContext);
  const { dispatch } = useContext(DarkModeContext);
  const {quantity}=useContext(CartContext);
  const ref = useRef(null);
  const name = useRef(null);
  const menu = useRef(null);
  const button = useRef(null);

  console.log(isAdmin);
  const handleLoginClick = async () => {
    if (isAuth && username) {
      signOut();
      await axios.get("/api/logout");
      router.push("/");
    } else {
      console.log(username);
      if (username === "") {
        router.push("/Registration");
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => { loadUserData(); }, []);

  return (
    <>
      <div className="w-full h-16 fixed flex justify-center text-white z-50 mt-2" style={{justifyContent: 'center',}}>
        <div ref={ref} className="flex justify-between items-center w-[70%] lg:w-3/4 bg-black border-black border-2 rounded-full px-6">
          <div ref={name} className="text-3xl font-bold">Sparsha</div>
          <div ref={menu} id="menu" className={`lg:flex items-center space-x-8 text-lg font-medium hidden lg:flex-row flex-col lg:space-y-0 space-y-8`}>
            <span><Link id="l" href="/" className="hover:text-orange-400 transition ease-in-out duration-150">Home</Link></span>
            <span><Link id="l" href="/Menu" className="hover:text-orange-400 transition ease-in-out duration-150">Menu</Link></span>
            <span><Link id="l" href="/Photos" className="hover:text-orange-400 transition ease-in-out duration-150">Photos</Link></span>
            <span><Link id="l" href="/cart" className="hover:text-orange-400 transition ease-in-out duration-150">Cart({quantity || 0})</Link></span>
            <Menu setActive={setActive}>
              <span>
                <MenuItem setActive={setActive} active={active} item="Bookings">
                  <div className='flex flex-col gap-x-2.5'>
                    <HoveredLink href="/theater-booking">Private Theater Booking</HoveredLink>
                    <Separator className='my-4'/>
                    <HoveredLink href="/restaurant">Restaurant Seat Booking</HoveredLink>
                    <Separator className='my-4' />
                    <HoveredLink href="/birthdayhallbooking">Birthday Hall Booking</HoveredLink>
                  </div>
                </MenuItem>
              </span>
            </Menu>
          </div>
          <div ref={button} className={`lg:flex hidden items-center space-x-4 "hidden" lg:flex-row flex-col lg:space-y-0 space-y-8`}>
            {isAuth && username && <Link href="/profile"><div className="block">{username}</div></Link>}
            {isAdmin && <Link href="/admin" className="hover:text-orange-400 transition ease-in-out duration-150">Dashboard</Link>}
            <button
              onClick={handleLoginClick}
              className="bg-white text-gray-900 py-2 px-6 rounded-full hover:bg-black hover:text-white delay-75 border-2 hover:border-white border-black transition ease-in-out duration-150"
            >
              {isAuth && username ? "Logout" : "Login/Register"}
            </button>
          </div>
          <button onClick={toggleMenu} className="block lg:hidden text-2xl bg-transparent m-0">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden w-full h-screen fixed bg-gray-900 text-white z-40 flex flex-col items-center pt-[2vw] space-y-4" style={{justifyContent:"center"}} >
          <Link href="/" className="text-xl" onClick={toggleMenu}>Home</Link>
          <Link href="/Menu" className="text-xl" onClick={toggleMenu}>Menu</Link>
          <Link href="/Photos" className="text-xl" onClick={toggleMenu}>Photos</Link>
          <Link href="/theater-booking" className="text-xl" onClick={toggleMenu}>Private Theater Booking</Link>
          <Link href="/restaurant" className="text-xl" onClick={toggleMenu}>Restaurant</Link>
          <Link  href="/cart" className="hover:text-orange-400 transition ease-in-out duration-150">Cart({cart?.cartItems?.length || 0})</Link>

          <Link href="/birthdayhallbooking" className="text-xl" onClick={toggleMenu}>Birthday Hall Booking</Link>
          {isAuth && username && <Link href="/profile" className="text-xl" onClick={toggleMenu}>{username}</Link>}
          {isAdmin && <Link href="/admin" className="text-xl" onClick={toggleMenu}>Dashboard</Link>}
          <button
            onClick={handleLoginClick}
            className="bg-white text-gray-900 py-2 px-6 rounded-full hover:bg-black hover:text-white delay-75 border-2 hover:border-white border-black transition ease-in-out duration-150"
          >
            {isAuth ? "Logout" : "Login/Register"}
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
