import React, { useEffect, useState } from 'react';
import AuthLayout from "../../component/AuthLayout";
import { useParams } from 'react-router-dom';
import Listing from '../../Apis/Listing';

export default function CustomerDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.CustomerDetail(id);
      if (response.data) {
        setData(response.data.data);
      } else {
        setData([]);
      }
        setLoading(false);
    } catch (error) {
      console.log("error", error);
      setData([]);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if(id){
        fetchData(id);
    }
  }, [id]);

  console.log("data", data);

  return (
    <AuthLayout>
    <div>CustomerDetail</div>
    </AuthLayout>
  )
}