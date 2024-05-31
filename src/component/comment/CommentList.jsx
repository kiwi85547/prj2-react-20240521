import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { CommentItem } from "./CommentItem.jsx";

export function CommentList({ boardId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => setCommentList(res.data))
        .catch((err) => console.log(err))
        .finally();
    }
  }, [isProcessing]);
  // [] 첫 렌더링에만 실행됨

  if (commentList.length === 0) {
    return <Box>댓글이 없습니다.</Box>;
  }

  // commentList가 배열이고
  // [{id:3},{memberId:22},{inserted: },{comment: "첫 댓글"}]
  return (
    // <Card>
    //   <CardBody>
    //
    //   </CardBody>
    // </Card>
    <Box>
      {commentList.map((comment) => (
        <CommentItem
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          comment={comment}
          key={comment.id}
        />
      ))}
    </Box>
  );
}
