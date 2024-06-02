import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/board/list")
      .then((res) => {
        setBoardList(res.data);
      })
      .catch()
      .finally();
  }, []);

  return (
    <Box>
      <Box m={5} fontSize={"1.8rem"}>
        게시판
      </Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>제목</Th>
              <Th>작성자</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/*onClick={() => navigate(`/board/${board.id}`)}*/}
            {boardList.map((board) => (
              <Tr
                cursor={"pointer"}
                _hover={{ bgColor: "gray.100" }}
                onClick={() => navigate(`/board/${board.id}`)}
                key={board.id}
              >
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.memberId}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
