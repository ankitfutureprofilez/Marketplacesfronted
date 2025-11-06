import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Listing from '../Apis/Listing';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const fetchData = async (signal) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const main = new Listing();
      const response = await main.profileVerify({ signal });
      if (response.data) {
        setContent(response.data.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      if (error.response?.status === 401 || error.message === "No token found") {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => {
      console.log("Aborting fetch...");
      controller.abort();
    };
  }, []);

  return (
    <div className='flex bg-[#F5F6FB] min-h-screen h-full pl-[10px] md:pl-[15px] xl:pl-[330px]'>
      <SideBar />
      {children}
    </div>
  );
}
