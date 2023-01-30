import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Success = () => {

  
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {
         `Order has been created successfully.`
        }
        <Link to="/">
          <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </Link>
    </div>
  );
};

export default Success;   
