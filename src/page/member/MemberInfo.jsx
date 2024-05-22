import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState("");
  useEffect(() => {
    axios.get(`/api/member/${id}`).then((member) => setMember(member.data));
  }, []);

  return (
    <Box>
      <Box>{member.id}번 회원 정보</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input value={member.email} readOnly />
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input value={member.nickName} readOnly />
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>가입 일시</FormLabel>
            <Input value={member.inserted} readOnly />
          </FormControl>
        </Box>

        {/*<Box>*/}
        {/*  <FormControl>*/}
        {/*    <FormLabel>가입 일시(다른버전)</FormLabel>*/}
        {/*    <Input value={member.signupDateAndTime} readOnly />*/}
        {/*  </FormControl>*/}

        </Box>
      </Box>
    </Box>
  );
}
