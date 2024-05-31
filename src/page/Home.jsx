import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box mx={{ base: 5, lg: 200 }} mt={10}>
        <Outlet />
      </Box>
    </Box>
  );
}
