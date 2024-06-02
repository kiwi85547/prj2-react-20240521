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
    </Box>
  );
}
