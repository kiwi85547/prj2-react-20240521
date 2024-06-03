import {
  Box,
  Button,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function BoardEdit() {
  const [board, setBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            description: "해당 게시글을 찾을 수 없습니다.",
            status: "error",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);
  // useEffect(() => {
  //   axios.get(`/api/board/${id}`, {
  //     headers: { 'Cache-Control': 'no-cache' }
  //   }).then((res) => setBoard(res.data));
  // }, [id]);

  if (board === null) {
    return <Spinner />;
  }

  // function handleSaveClick() {
  //   setIsLoading(true);
  //   axios
  //     .put(`/api/board/${id}`, board)
  //     .then(() => {
  //       toast({
  //         description: "수정 되었습니다.",
  //         position: top,
  //         status: "success",
  //       });
  //       navigate(`/board/${board.id}`);
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 400) {
  //         toast({
  //           description:
  //             "게시물이 수정되지 않았습니다. 작성한 내용을 확인해주세요.",
  //           position: "top",
  //           status: "error",
  //         });
  //       }
  //     })
  //     .finally(setIsLoading(false));
  // }
  //
  // let isDisable = false;
  // if (board.title.trim().length === 0 || board.content.trim().length === 0) {
  //   isDisable = true;
  // }

  return (
    <Box>
      {board.id}번 게시물 수정
      <Box>
        제목
        <Input
          defaultValue={board.title}
          // onChange={(e) => setBoard({ ...board, title: e.target.value })}
        ></Input>
      </Box>
      <Box>
        본문
        <Textarea
          defaultValue={board.content}
          // onChange={(e) => setBoard({ ...board, content: e.target.value })}
        ></Textarea>
      </Box>
      <Box>
        작성자
        <Input readOnly value={board.memberId}></Input>
      </Box>
      <Box>
        <Button
          colorScheme={"blue"}
          // onClick={handleSaveClick}
          // isDisabled={isDisable}
          isLoading={isLoading}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}
