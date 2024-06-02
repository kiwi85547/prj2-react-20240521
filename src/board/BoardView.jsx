import { Box, Button, Input, Spinner, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch()
      .finally();
  }, []);

  if (board === null) {
    <Spinner />;
  }

  function handleDeleteClick() {}

  return (
    <Box>
      글 작성 화면
      <Box>
        제목
        <Input readOnly value={board.title} />
      </Box>
      <Box>
        본문
        <Textarea readOnly value={board.content} />
      </Box>
      <Box>
        작성일시
        <Input readOnly type={"datetime-local"} value={board.inserted} />
      </Box>
      <Box>
        작성자
        <Input readOnly value={board.memberId} />
      </Box>
      <Box>
        <Button
          colorScheme={"blue"}
          // onClick={handleSaveClick}
          // isDisabled={isDisable}
          // isLoading={isLoading}
        >
          수정
        </Button>
        <Button colorScheme={"red"} onClick={handleDeleteClick}>
          삭제
        </Button>
      </Box>
    </Box>
  );
}
