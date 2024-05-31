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
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";
import {
  faCalendarDays,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { CommentEdit } from "./CommentEdit.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const account = useContext(LoginContext);
  const toast = useToast();

  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        onClose();
        setIsProcessing(false);
        toast({
          description: "댓글이 삭제되었습니다.",
          position: "top",
          status: "info",
          duration: 1500,
        });
      });
  }

  return (
    <Box>
      <Flex mb={7}>
        <Flex fontWeight={900}>
          <Box mr={3}>
            <FontAwesomeIcon icon={faUser} />
          </Box>
          <Text>{comment.nickName}</Text>
        </Flex>
        <Spacer />
        <Box>
          <FontAwesomeIcon icon={faCalendarDays} />
        </Box>
        <Box>{comment.inserted}</Box>
      </Flex>

      {isEditing || (
        <Flex>
          {/* 많은 글을 보여줄 때 스크롤 없애기*/}
          <Box whiteSpace={"pre"}>{comment.comment}</Box>
          <Spacer />
          {account.hasAccess(comment.memberId) && (
            <Stack>
              <Box>
                <Button
                  colorScheme={"purple"}
                  onClick={() => setIsEditing(true)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button
                  isLoading={isProcessing}
                  colorScheme="red"
                  onClick={onOpen}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </Box>
            </Stack>
          )}
        </Flex>
      )}
      {isEditing && (
        <CommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
        />
      )}
      {/*hasAccess 와 같은 코드*/}
      {account.id == comment.memberId && (
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
      )}
    </Box>
  );
}
