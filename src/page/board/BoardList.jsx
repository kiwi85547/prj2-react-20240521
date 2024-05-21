import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BoardList() {
  const [boardList, setBoardList] = useState([]);

  // [{id:5, title:"제목1", writer : "누구1"},
  // {id:5, title:"제목1", writer : "누구1"},
  // {id:5, title:"제목1", writer : "누구1"}]
  return (
    <Box>
      게시물 목록
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>TiTle</Th>
              <Th>
                <FontAwesomeIcon icon="fa-solid fa-user-pen" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr key={board.id}>
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
