import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState(false);
  const account = useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);

  if (board != null) {
    console.log(board);
    console.log(account.hasAccess(board.memberId));
  }

  function handleClickRemove() {
    axios
      .delete(`/api/board/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast({
          status: "success",
          description: `${id}번 게시물이 삭제되었습니다.`,
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `${id}번 게시물 삭제 중 오류가 발생하였습니다.`,
          position: "top",
        });
      })
      .finally(() => {
        onClose();
      });
  }

  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex>
        <Heading>{board.id}번 게시물</Heading>
        <Spacer />
        <Box onClick={() => setLike(!like)} cursor="pointer" fontSize="3xl">
          {like && <FontAwesomeIcon icon={fullHeart} />}
          {like || <FontAwesomeIcon icon={emptyHeart} />}
        </Box>
      </Flex>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input value={board.title} readOnly />
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea value={board.content} readOnly />
          </FormControl>
        </Box>

        <Box>
          <Box>
            {board.fileList &&
              board.fileList.map((file) => (
                <Box border={"2px solid black"} m={3} key={file.name}>
                  <Image src={file.src} />
                </Box>
              ))}
          </Box>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input value={board.writer} readOnly />
          </FormControl>
        </Box>

        <Box>
          <FormControl>작성일시</FormControl>
          <Input type={"datetime-local"} value={board.inserted} readOnly />
        </Box>
      </Box>

      {account.hasAccess(board.memberId) && (
        <Box>
          <Button
            colorScheme={"purple"}
            onClick={() => navigate(`/edit/${board.id}`)}
          >
            수정
          </Button>
          <Button colorScheme={"red"} onClick={onOpen}>
            삭제
          </Button>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button colorScheme={"red"} onClick={handleClickRemove}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
