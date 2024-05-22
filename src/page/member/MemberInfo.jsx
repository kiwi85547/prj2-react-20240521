import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberInfo() {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // 경로에 붙어서
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((response) => setMember(response.data))
      .catch((err) => {
        if (err.status === 404) {
          toast({
            status: "info",
            description: "잘못된 경로입니다.",
            duration: 200,
          });
          navigate("/");
        }
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleClickRemove() {
    axios
      .delete(`/api/member/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: "탈퇴 되었습니다.",
          position: "top",
          duration: 1500,
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 탈퇴 중 문제가 발생하였습니다.",
          position: "top",
          duration: 1500,
        });
      })
      .finally(() => {
        // 탈퇴 버튼을 연속으로 누르지 못하도록
        setIsLoading(false);
      });
  }

  return (
    <Box>
      <Box>회원 정보</Box>
      <Box>
        <Box>
          <Box>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input isReadOnly value={member.email} />
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>별명</FormLabel>
              <Input isReadOnly value={member.email} />
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>가입일시</FormLabel>
              <Input
                isReadOnly
                value={member.inserted}
                type={"datetime-local"}
              />
            </FormControl>
          </Box>
          <Box>
            <Button colorScheme={"purple"}>수정</Button>
            <Button
              colorScheme={"red"}
              onClick={handleClickRemove}
              isloading={isLoading}
            >
              탈퇴
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
