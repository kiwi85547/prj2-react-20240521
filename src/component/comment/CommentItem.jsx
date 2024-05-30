import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const account = useContext(LoginContext);
  const toast = useToast();

  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/remove`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id: comment.id, memberId: comment.memberId },
      })
      .then((res) => {
        toast({
          description: "댓글이 삭제되었습니다.",
          position: "top",
          status: "info",
          duration: 1500,
        });
      })
      .catch((err) => {
        toast({
          description: "댓글이 삭제에 실패했습니다.",
          position: "top",
          status: "error",
          duration: 1500,
        });
      })
      .finally(() => {
        onClose();
        setIsProcessing(false);
      });
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
          {account.hasAccess(comment.memberId) && (
            <Button isLoading={isProcessing} colorScheme="red" onClick={onOpen}>
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          )}
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>댓글을 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              isLoading={isProcessing}
              colorScheme={"red"}
              onClick={handleRemoveClick}
            >
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
