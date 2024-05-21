import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/board/list").then((res) => {
      setBoardList(res.data);
    });
  }, []);

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
                <FontAwesomeIcon icon={faUserPen} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((a) => (
              <Tr
                cursor={"pointer"}
                _hover={{ bgColor: "gray.200" }}
                onClick={() => navigate(`/board/${a.id}`)}
                key={a.id}
              >
                <Td>{a.id}</Td>
                <Td>{a.title}</Td>
                <Td>{a.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
