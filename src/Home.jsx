import React from "react";
import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <Box>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      home 화면, Outlet 밑입니다.
    </Box>
  );
}
