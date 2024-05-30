import { Box, Button, Textarea, Tooltip, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentWrite({ boardId, isSending, setIsSending }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const account = useContext(LoginContext);
  // const [isSending, setIsSending] = useState(false);

  // 전송버튼을 눌렀을 때 isSending이 true로 바뀜

  function handleCommentSubmitClick() {
    setIsSending(true);
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setComment("");
        toast({
          description: "댓글이 등록되었습니다.",
          position: "top",
          status: "success",
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <Box>
      <Textarea
        isDisabled={!account.isLoggedIn()}
        placeholder={
          account.isLoggedIn()
            ? "댓글을 작성해 보세요."
            : "댓글을 저장하시려면 로그인하세요"
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Tooltip
        label="로그인 하세요"
        isDisabled={account.isLoggedIn()}
        placement={"top"}
      >
        <Button
          isDisabled={comment.trim().length === 0 || !account.isLoggedIn()}
          isLoading={isSending}
          onClick={handleCommentSubmitClick}
          colorScheme={"blue"}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Tooltip>
    </Box>
  );
}
