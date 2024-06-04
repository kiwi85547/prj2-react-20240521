import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  let isloading = false;
  let isdisabled = true;
  function handleSignup() {
    isloading = true;
    axios
      .post("/api/member/signup", { email, password, nickName })
      .then(() => {
        toast({
          description: "회원가입 되었습니다.",
          position: "top",
          status: "success",
          duration: 2000,
        }),
          navigate("/");
      })
      .catch((res) => {
        if (res.response.status === 500) {
          toast({
            description: "회원가입에 실패하였습니다.",
            position: "top",
            status: "error",
            duration: 2000,
          });
        }
      })
      .finally((isloading = false));
  }
  if (password === passwordCheck) {
    isdisabled = false;
  }

  return (
    <>
      <Box mx={100}>
        <Box mt={10} mb={8} fontSize={30}>
          회원가입 페이지
        </Box>
        <FormControl mb={5}>
          이메일
          <FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </FormLabel>
          <Button>중복확인</Button>
        </FormControl>
        <FormControl mb={5}>
          패스워드
          <FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} />
          </FormLabel>
        </FormControl>
        <FormControl mb={5}>
          패스워드 확인
          <FormLabel>
            <Input onChange={(event) => setPasswordCheck(event.target.value)} />
          </FormLabel>
          {password !== passwordCheck && (
            <FormHelperText>비밀번호가 맞는지 확인하세요.</FormHelperText>
          )}
        </FormControl>
        <FormControl mb={5}>
          닉네임
          <FormLabel>
            <Input onChange={(e) => setNickName(e.target.value)} />
          </FormLabel>
        </FormControl>
        <Button
          colorScheme={"blue"}
          onClick={handleSignup}
          isLoading={isloading}
          isDisabled={isdisabled}
        >
          회원가입
        </Button>
        <Outlet />
      </Box>
    </>
  );
}
