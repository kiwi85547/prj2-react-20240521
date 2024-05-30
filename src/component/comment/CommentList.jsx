import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentList({ boardId }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/comment/list/${boardId}`)
      .then((res) => setCommentList(res.data))
      .catch((err) => console.log(err))
      .finally();
  }, []);
  // [] 첫 렌더링에만 실행됨

  if (commentList.length === 0) {
    return <Box>댓글이 없습니다.</Box>;
  }

  // commentList가 배열이고
  // [{id:3},{memberId:22},{inserted: },{comment: "첫 댓글"}]
  return (
    <Box>
      {commentList.map((comment) => (
        <Box key={comment.id} border={"1px solid black"} my={3}>
          <Flex>
            <Box>{comment.memberId}</Box>
            <Spacer />
            <Box>{comment.inserted}</Box>
            <Box>{comment.comment}</Box>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
