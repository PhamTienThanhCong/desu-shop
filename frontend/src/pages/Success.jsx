import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";

const Success = () => {
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)


  useEffect(() => {
    
 const timer = setTimeout(() => {
      window.location.replace("/");
    }, 5000);
    return () => clearTimeout(timer);
  });

  
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {
         `Order has been created successfully.`
        }
      <button style={{ padding: 10, marginTop: 20 }} onClick= {timer}>Go to Homepage</button>
    </div>
  );
};

export default Success;   
