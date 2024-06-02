import { Box, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memberId, setMemberId] = useState(7);

  const toast = useToast();

  function handleSaveClick() {
    axios
      .post("/api/board/add", {
        title,
        content,
        memberId,
      })
      .then(() =>
        toast({
          description: "요청 성공",
          position: "top",
          status: "success",
        }),
      )
      .catch()
      .finally();
  }

  return (
    <Box>
      글 작성 화면
      <Box>
        제목
        <Input onChange={(e) => setTitle(e.target.value)}></Input>
      </Box>
      <Box>
        본문
        <Textarea onChange={(e) => setContent(e.target.value)}></Textarea>
      </Box>
      <Box>
        작성자
        <Input readOnly value={memberId}></Input>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={handleSaveClick}>
          저장
        </Button>
      </Box>
    </Box>
  );
}
