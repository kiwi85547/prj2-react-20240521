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
  // 중복확인 했는지, 안했는지
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

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
          duration: 1500,
          isClosable: true,
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
            duration: 1500,
            isClosable: true,
          });
        } else {
          toast({
            status: "error",
            description: "회원 가입 중 문제가 발생하였습니다.",
            position: "top",
            duration: 1500,
            isClosable: true,
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
          duration: 1500,
          isClosable: true,
        });
      })
      // 사용할 수 있는 이메일
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다.",
            position: "top",
            duration: 1500,
            isClosable: true,
          });
          setIsCheckedEmail(true);
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
          duration: 1500,
          isClosable: true,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 닉네임입니다.",
            position: "top",
            duration: 1500,
            isClosable: true,
          });
          setIsCheckedNickName(true);
        }
      })
      .finally();
  }

  const isCheckedPassword = password === passwordCheck;

  // isDisabled=false 버튼 활성화
  let isDisabled = false;

  // isDisabled=true 버튼 비활성화
  if (!isCheckedPassword) {
    isDisabled = true;
  }
  if (
    !(
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      nickName.trim().length > 0
    )
  ) {
    isDisabled = true;
  }

  if (!isCheckedEmail) {
    isDisabled = true;
  }

  if (!isCheckedNickName) {
    isDisabled = true;
  }

  if (!isValidEmail) {
    isDisabled = true;
  }

  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <InputGroup>
            <Input
              type={"email"}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsCheckedEmail(false);
                setIsValidEmail(!e.target.validity.typeMismatch);
                console.log(e.target.validity);
                // true 이면 Mismatch, false이면 잘 매치됨.
                console.log(e.target.validity.typeMismatch);
              }}
            />
            <InputRightElement w={"75px"} mr={1}>
              <Button
                isDiabled={!isValidEmail || email.trim().length === 0}
                onClick={handleCheckEmail}
                size={"sm"}
              >
                중복확인
              </Button>
            </InputRightElement>
          </InputGroup>
          {isCheckedEmail || (
            <FormHelperText>이메일 중복확인을 해주세요.</FormHelperText>
          )}
          {isValidEmail || (
            <FormHelperText>
              올바른 이메일 형식으로 작성해 주세요.
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel>암호</FormLabel>
          <Input onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel>암호 확인</FormLabel>
          <Input onChange={(e) => setPasswordCheck(e.target.value)} />
          {isCheckedPassword || (
            <FormHelperText>암호가 일치하지 않습니다.</FormHelperText>
          )}
        </FormControl>
      </Box>

      {/*value={nickName} 앞자리 띄어쓰기 못하게*/}
      <Box>
        <FormControl>
          <FormLabel>별명</FormLabel>
          <InputGroup>
            <Input
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value.trim());
                setIsCheckedNickName(false);
              }}
            />
            <InputRightElement w={"75px"} mr={1}>
              <Button
                isDisabled={nickName.trim().length === 0}
                onClick={handleCheckNickName}
                size="sm"
              >
                중복확인
              </Button>
            </InputRightElement>
          </InputGroup>
          {isCheckedNickName || (
            <FormHelperText>별명 중복확인을 해주세요.</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        {/*isDisabled가 true이면 비활성화*/}
        <Button
          colorScheme={"blue"}
          onClick={handleClick}
          isLoading={isLoading}
          isDisabled={isDisabled}
        >
          가입
        </Button>
      </Box>
    </Box>
  );
}
