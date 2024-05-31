import { useNavigate } from "react-router-dom";
import { Box, Center, Flex, Hide, Show, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPencil,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex px={{ lg: 200, base: 0 }} gap={3} height={20} bgColor={"gray.100"}>
      <Center
        p={6}
        fontSize={20}
        fontWeight={600}
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.200" }}
      >
        <Show below={"lg"}>
          <FontAwesomeIcon icon={faHouse} />
        </Show>
        <Hide below={"lg"}>Home</Hide>
      </Center>

      {/*로그인 되었을 때*/}
      {account.isLoggedIn() && (
        <Center
          p={6}
          fontSize={20}
          fontWeight={600}
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          <Show below={"lg"}>
            <FontAwesomeIcon icon={faPencil} />
          </Show>
          <Hide below={"lg"}>글쓰기</Hide>
        </Center>
      )}

      <Spacer />
      {account.isLoggedIn() && (
        <Center
          p={6}
          fontSize={20}
          fontWeight={600}
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          <Flex gap={2}>
            <Box>
              <FontAwesomeIcon icon={faUser} />
            </Box>
            <Box>
              <Hide below={"lg"}>{account.nickName}</Hide>
            </Box>
          </Flex>
        </Center>
      )}
      {account.isAdmin() && (
        <Center
          p={6}
          fontSize={20}
          fontWeight={600}
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          <FontAwesomeIcon icon={faUsers} />
        </Center>
      )}

      {/* 로그인이 되지 않았을 때*/}
      {account.isLoggedIn() || (
        <Center
          p={6}
          fontSize={20}
          fontWeight={600}
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          p={6}
          fontSize={20}
          fontWeight={600}
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          <FontAwesomeIcon icon={faRightToBracket} />
        </Center>
      )}
      {account.isLoggedIn() && (
        <Center
          p={6}
          fontSize={20}
          fontWeight={600}
          onClick={() => {
            account.logout();
            // localStorage.removeItem("token");
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Center>
      )}
    </Flex>
  );
}
