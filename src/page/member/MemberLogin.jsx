import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  // 필요한 정보만 분해할당해서 써도 됨
  const account = useContext(LoginContext);

  function handleLogin() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);
        // localStorage.setItem("token", res.data.token);
        toast({
          status: "success",
          description: "로그인 되었습니다.",
          position: "top",
          duration: 1000,
        });
        navigate("/");
      })
      .catch(() => {
        account.logout();
        // localStorage.removeItem("token");
        toast({
          status: "warning",
          description: "이메일과 패스워드를 확인해주세요",
          position: "top",
          duration: 1000,
        });
      });
  }

  return (
    <Center>
      <Box w={500}>
        <Box mb={10}>
          <Heading>로그인</Heading>
        </Box>
        <Box>
          <Box mb={7}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          </Box>
          <Box mb={7}>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </Box>
          <Box mb={7}>
            <Button onClick={handleLogin} colorScheme={"blue"}>
              로그인
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
