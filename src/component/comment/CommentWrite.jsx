import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function CommentWrite({ boardId, isSending, setIsSending }) {
  const [comment, setComment] = useState("");
  // const [isSending, setIsSending] = useState(false);

  // 전송버튼을 눌렀을 때 isSending이 true로 바뀜

  function handleCommentSubmitClick() {
    setIsSending(true);
    axios
      .post("/api/comment/add", { boardId, comment })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글을 작성해 보세요."}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isLoading={isSending}
        onClick={handleCommentSubmitClick}
        colorScheme={"blue"}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Box>
  );
}
