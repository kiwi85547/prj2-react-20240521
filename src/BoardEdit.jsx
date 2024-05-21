import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data));
  }, []);

  // function은 return문 위에
  function handleClickSave() {
    // 수정은 put요청
    axios.put(`/api/board/edit`, board);
  }

  if (board === null) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box>{board.id}번 게시물 수정</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>제목</FormLabel>
            {/*onChange 안에 새 객체를 넣기*/}
            <Input
              defaultValue={board.title}
              onChange={(e) => {
                setBoard({ ...board, title: e.target.value });
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea
              defaultValue={board.content}
              onChange={(e) => {
                setBoard({ ...board, content: e.target.value });
              }}
            ></Textarea>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input
              defaultValue={board.writer}
              onChange={(e) => {
                setBoard({ ...board, writer: e.target.value });
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <Button onClick={handleClickSave} colorScheme={"blue"}>
            저장
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
