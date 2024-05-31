import { useNavigate } from "react-router-dom";
import { Center, Flex, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        Home
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
          글쓰기
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
          <FontAwesomeIcon icon={faUser} />
          {account.nickName}
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
          회원목록
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
          회원가입
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
          로그인
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
          로그아웃
        </Center>
      )}
    </Flex>
  );
}
