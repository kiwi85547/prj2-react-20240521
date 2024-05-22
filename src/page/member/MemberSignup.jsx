import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  // 저장 버튼 여러번 넘어가지 않도록
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleClick() {
    setIsLoading(true);
    // 객체가 직렬화해서 넘어감
    axios
      .post("/api/member/signup", { email, password, nickName })
      .then(() => {
        toast({
          status: "success",
          description: "회원 가입이 완료되었습니다.",
          position: "top",
        });
        // todo : 로그인 화면으로 이동
        navigate("/");
      })
      .catch((err) => {
        // 클라이언트 쪽 오류
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "입력값을 확인해주세요",
            position: "top",
          });
        } else {
          toast({
            status: "error",
            description: "회원 가입 중 문제가 발생하였습니다.",
            position: "top",
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel>패스워드</FormLabel>
          <Input onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel>별명</FormLabel>
          <Input onChange={(e) => setNickName(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <Button
          colorScheme={"blue"}
          onClick={handleClick}
          isLoading={isLoading}
        >
          가입
        </Button>
      </Box>
    </Box>
  );
}
