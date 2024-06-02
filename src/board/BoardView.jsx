import {
  Box,
  Button,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

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

  function handleDeleteClick() {
    axios.delete(`/api/board/${id}`).then(
      () =>
        toast({
          description: `${id}번 게시물이 삭제되었습니다.`,
          position: "top",
          status: "info",
          duration: 2000,
        }),
      navigate("/"),
    );
  }

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
        <Button colorScheme={"blue"} onClick={() => navigate(`/edit/${id}`)}>
          수정
        </Button>
        <Button colorScheme={"red"} onClick={handleDeleteClick}>
          삭제
        </Button>
      </Box>
    </Box>
  );
}
