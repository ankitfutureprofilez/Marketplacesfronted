import React from 'react';

export const formatMultiPrice = (amount) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0, //Digits after decimal
    maximumFractionDigits: 0, //Digits after decimal
  }).format(amount);
};

const Valuedata = () => {
  return (
    <>
    </>
  );
}

export default Valuedata;