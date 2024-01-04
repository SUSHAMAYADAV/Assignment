import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoutes(props) {
    console.log("------>Props---->", props)
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <Box>
      <Component />
    </Box>
  );
}
