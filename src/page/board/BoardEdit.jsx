import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
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
  Spinner,
  Stack,
  StackDivider,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data.board));
  }, []);

  // function은 return문 위에
  function handleClickSave() {
    // 수정은 put요청

    axios
      .putForm(`/api/board/edit`, {
        id: board.id,
        title: board.title,
        content: board.content,
        removeFileList,
        addFileList,
      })
      .then(() => {
        toast({
          status: "success",
          description: `${board.id}번 게시물이 수정되었습니다.`,
          position: "top",
        });
        navigate(`/board/${board.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: `${board.id}번 게시물이 수정되지 않았습니다..`,
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  if (board === null) {
    return <Spinner />;
  }

  // 추가 파일 선택하면 목록 보이기
  const fileNameList = [];

  for (let addFile of addFileList) {
    // 이미 있는 파일과 중복된 파일명인지?
    let duplicate = false;
    for (let file of board.fileList) {
      if (file.name === addFile.name) {
        duplicate = true;
        break;
      }
    }
    fileNameList.push(
      <Box>
        <Text fontSize={"md"} mr={3}>
          {addFile.name}
        </Text>
        <Box>{duplicate && <Badge colorScheme={"red"}>override</Badge>}</Box>
      </Box>,
    );
  }

  function handleRemoveSwitchChange(name, checked) {
    if (checked) {
      setRemoveFileList([...removeFileList, name]);
    } else {
      setRemoveFileList(removeFileList.filter((item) => item !== name));
    }

    return undefined;
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
          <Box>
            {board.fileList &&
              board.fileList.map((file) => (
                <Card m={3} key={file.name}>
                  <Flex>
                    <FontAwesomeIcon icon={faTrashCan} />
                    <Switch
                      onChange={(e) =>
                        handleRemoveSwitchChange(file.name, e.target.checked)
                      }
                    />
                    <Text>{file.name}</Text>
                  </Flex>
                  <Box>
                    <Image
                      sx={
                        removeFileList.includes(file.name)
                          ? { filter: "blur(8px)" }
                          : {}
                      }
                      src={file.src}
                    />
                  </Box>
                </Card>
              ))}
          </Box>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setAddFileList(e.target.files)}
            />
            <FormHelperText>
              총 용량은 10MB, 한 파일은 1MB를 초과할 수 없습니다.
            </FormHelperText>
          </FormControl>
        </Box>

        {fileNameList.length > 0 && (
          <Box mb={7}>
            <Card>
              <CardHeader>
                <Heading size={"md"}>선택된 파일 목록</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing={4}>
                  {fileNameList}
                </Stack>
              </CardBody>
            </Card>
          </Box>
        )}

        <Box>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input defaultValue={board.writer} readOnly />
          </FormControl>
        </Box>
        <Box>
          <Button onClick={onOpen} colorScheme={"blue"}>
            저장
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleClickSave} colorScheme={"blue"}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
