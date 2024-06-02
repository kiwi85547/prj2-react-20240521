import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Home.jsx";
import { BoardList } from "./board/BoardList.jsx";
import { BoardWrite } from "./board/BoardWrite.jsx";
import { BoardView } from "./board/BoardView.jsx";
import { BoardEdit } from "./board/BoardEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <BoardList />,
      },
      { path: "write", element: <BoardWrite /> },
      { path: "board/:id", element: <BoardView /> },
      { path: "edit/:id", element: <BoardEdit /> },
    ],
  },
]);

function App(props) {
  return;
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>;
}

export default App;
