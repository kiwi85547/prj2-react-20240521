import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
    // dependency가 있으면 위의 함수를 트리거함. 얘가 변경되면 다시 마운트됨.
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

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
      <Box>
        {pageNumbers.map((pageNumber) => (
          <Button
            onClick={navigate(`/?page/${pageNumber}`)}
            key={pageNumber}
            colorScheme={
              pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
            }
          >
            {pageNumber}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
