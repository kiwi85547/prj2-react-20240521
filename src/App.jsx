import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home.jsx";
import { BoardWrite } from "./board/BoardWrite.jsx";
import { BoardList } from "./board/BoardList.jsx";
import { BoardView } from "./board/BoardView.jsx";
import { BoardEdit } from "./board/BoardEdit.jsx";
import { MemberSignup } from "./member/MemberSignup.jsx";

function ChildrenTest() {
  return <Box>children 안에 childeren</Box>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // { path: "", element: <BoardList /> },와 같음
      { index: "true", element: <BoardList /> },
      { path: "write", element: <BoardWrite /> },
      { path: "board/:id", element: <BoardView /> },
      { path: "edit/:id", element: <BoardEdit /> },
      {
        path: "signup",
        element: <MemberSignup />,
        children: [{ path: "children", element: <ChildrenTest /> }],
      },
    ],
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
