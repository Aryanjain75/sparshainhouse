"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UsernameContext = createContext();

export const UserProvider = ({ children }) => {
  const defaultUserState = {
    userid:"",
    username: "",
    isAuth: false,
    isAdmin: false,
    Address:[],
    Email: "",
    Password: "",
    PhoneNumber: "",
    url:""
  };

  const [userState, setUserState] = useState(defaultUserState);

  const loadUserData = async () => {
    try {
      const res = await axios.get("/api/details");
      if (res.status === 200) {
        const details = res.data.message;
        sessionStorage.setItem("username", details.Name);
        sessionStorage.setItem("isAuth", JSON.stringify(true)); // Assuming user is authenticated if data is fetched
        sessionStorage.setItem("Email", details.Email);
        sessionStorage.setItem("Password", details.Password);
        sessionStorage.setItem("PhoneNumber", details.PhoneNumber);
        sessionStorage.setItem("Address", details.Address);
        sessionStorage.setItem("userid", details.user);
        sessionStorage.setItem("url", details.url);

        setUserState({
          userid: details.user,
          username: details.Name,
          isAuth: true,
          isAdmin: details.isAdmin, // This should be determined based on user role
          Address:details.Address,
          Email: details.Email,
          Password: details.Password,
          PhoneNumber: details.PhoneNumber,
          url:details.url
        });
      }
    } catch (error) {
    }
  };


  const addUsername = (name) => {
    sessionStorage.setItem("username", name);
    setUserState((prevState) => ({ ...prevState, username: name }));
  };

  const updateField = (field, value) => {
    sessionStorage.setItem(field, value);
    setUserState((prevState) => ({ ...prevState, [field]: value }));
  };

  const setDefaultUserState = () => {
    Object.keys(defaultUserState).forEach(key => {
      sessionStorage.setItem(key, defaultUserState[key]);
    });
    setUserState(defaultUserState);
  };

  const signOut = () => {
    sessionStorage.clear();
    setDefaultUserState();
  };

  return (
    <UsernameContext.Provider
      value={{
        ...userState,
        setUsername: addUsername,
        updateField,
        setDefaultUserState,
        signOut,
        loadUserData
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};
