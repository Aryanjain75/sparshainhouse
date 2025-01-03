"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Update from "@/components/foodproducts/update";
export default function MenuPage ({ params })  {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(`/api/menu/${params.id}`);
        setMenuData(response.data.message);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <Update initialData={menuData}/>
  );
};

