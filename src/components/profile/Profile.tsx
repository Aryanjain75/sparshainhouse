/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link"; // Correct import for Next.js Link component
import UserAddresses from "../user/UserAddresses";
import { UsernameContext } from '@/context/UserContext';
import Image from "next/image";
export const Profile = () => {
  const { url, username, Address, Email, loadUserData, setUsername, setAuth, setAdmin, isAuth, isAdmin } = useContext(UsernameContext);

  useEffect(() => {
    loadUserData();
  }, []);

  // Log the URL to ensure it's correct
  console.log('Image URL:', url);

  return (
    <>
      <section className="py-10 ">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <figure className="flex items-start sm:items-center">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    {/* Ensure the URL is correctly set */}
                    {url ? (
                      <img src={url} alt="User Avatar" onError={(e) => e.currentTarget.style.display = 'none'} />
                    ) : (
                      <p>No Image Available</p>
                    )}
                  </div>
                </div>
                <figcaption>
                  <h5 className="font-semibold text-lg">{username}</h5>
                  <p>
                    <b>Email:</b> {Email}
                  </p>
                </figcaption>
              </figure>

              <hr className="my-4" />

              <UserAddresses addresses={Address} />

              <Link href="/addnewaddress" className="rounded-2xl border-2 border-black-400 p-4">
                <i className="mr-1 fa fa-plus"></i> Add new address
              </Link>

              <hr className="my-4" />
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
