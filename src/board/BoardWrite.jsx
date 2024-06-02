import { Box, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memberId, setMemberId] = useState(7);
  const navigate = useNavigate();
  const toast = useToast();

  function handleSaveClick() {
    axios
      .post("/api/board/add", {
        title,
        content,
        memberId,
      })
      .then(
        () =>
          toast({
            description: "새 글이 등록되었습니다.",
            position: "top",
            status: "success",
            duration: "2000",
          }),
        navigate("/"),
      )
      .catch(() =>
        toast({
          description: "실패하였습니다.",
          position: "top",
          status: "error",
          duration: "2000",
        }),
      )
      .finally();
  }

  let isDisable = false;
  if (title.trim().length === 0) {
    isDisable = true;
  }

  if (content.trim().length === 0) {
    isDisable = true;
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
        <Button
          colorScheme={"blue"}
          onClick={handleSaveClick}
          isDisabled={isDisable}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}
