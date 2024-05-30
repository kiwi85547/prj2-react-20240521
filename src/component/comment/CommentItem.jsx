import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";

export function CommentItem({ comment, setCommentList, isSending }) {
  function handleRemoveClick() {
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {
        useEffect(() => {
          setCommentList(res.data);
        }, [isSending]);
      })
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <Box border={"1px solid black"} my={3}>
      <Flex>
        <Box>{comment.nickName}</Box>
        <Spacer />
        <Box>{comment.inserted}</Box>
      </Flex>
      <Flex>
        <Box>{comment.comment}</Box>
        <Spacer />
        <Box>
          <Button colorScheme="red" onClick={handleRemoveClick}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
