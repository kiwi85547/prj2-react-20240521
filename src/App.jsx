import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home.jsx";
import { BoardWrite } from "./board/BoardWrite.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ path: "write", element: <BoardWrite /> }],
  },
]);

function App(props) {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
