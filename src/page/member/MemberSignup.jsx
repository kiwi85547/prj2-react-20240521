import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
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

  function handleCheckEmail() {
    // 서버에서 email 받아서 체크
    axios
      .get(`/api/member/check?email=${email}`)
      // 이미 있는 이메일
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 이메일입니다.",
          position: "top",
        });
      })
      // 사용할 수 있는 이메일
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다.",
            position: "top",
          });
        }
      })
      .finally();
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 닉네임입니다.",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 닉네임입니다.",
            position: "top",
          });
        }
      })
      .finally();
  }

  const isCheckPassword = password === passwordCheck;

  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <InputGroup>
            <Input onChange={(e) => setEmail(e.target.value)} />
            <InputRightElement w={"75px"} mr={1}>
              <Button onClick={handleCheckEmail} size={"sm"}>
                중복확인
              </Button>
            </InputRightElement>
          </InputGroup>
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
          <FormLabel>암호 확인</FormLabel>
          <Input onChange={(e) => setPasswordCheck(e.target.value)} />
          {isCheckPassword || (
            <FormHelperText>암호가 일치하지 않습니다.</FormHelperText>
          )}
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel>별명</FormLabel>
          <InputGroup>
            <Input onChange={(e) => setNickName(e.target.value)} />
            <InputRightElement w={"75px"} mr={1}>
              <Button onClick={handleCheckNickName} sizma="sm">
                중복확인
              </Button>
            </InputRightElement>
          </InputGroup>
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
