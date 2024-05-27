import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faMagnifyingGlass,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });

    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");
    if (typeParam) {
      setSearchType(typeParam);
    }
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }

    // dependency가 있으면 위의 함수를 트리거함. 얘가 변경되면 다시 마운트됨.
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  // [{id:5, title:"제목1", writer : "누구1"},
  // {id:5, title:"제목1", writer : "누구1"},
  function handleSearchClick() {
    navigate(`/?type=${searchType}&keyword=${searchKeyword}`);
  }

  // {id:5, title:"제목1", writer : "누구1"}]
  return (
    <Box>
      <Box>게시물 목록</Box>
      <Box>
        {boardList.length === 0 && <Center>조회 결과가 없습니다.</Center>}
        {boardList.length > 0 && (
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
        )}
      </Box>
      <Center>
        <Flex>
          <Box>
            <Select onChange={(e) => setSearchType(e.target.value)}>
              <option value="all">전체</option>
              <option value="text">글</option>
              <option value="nickName">작성자</option>
            </Select>
          </Box>
          <Box>
            <Input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder={"검색어"}
            />
          </Box>
          <Box>
            <Button onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Box>
        </Flex>
      </Center>
      <Center>
        <ButtonGroup>
          <Box>
            {/* 처음 버튼, 이전 버튼 조건이 같음. 여러개의 컴포넌트이면 <></>로 감싸기*/}
            {pageInfo.prevPageNumber && (
              <>
                <Button onClick={() => navigate(`/?page=1`)}>
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </Button>
                <Button
                  onClick={() => navigate(`/?page=${pageInfo.prevPageNumber}`)}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
              </>
            )}
            {/* localhost:5173/?page=1 */}
            {pageNumbers.map((pageNumber) => (
              <Button
                onClick={() => navigate(`/?page=${pageNumber}`)}
                key={pageNumber}
                colorScheme={
                  pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
                }
              >
                {pageNumber}
              </Button>
            ))}
            {pageInfo.nextPageNumber && (
              <Button
                onClick={() => navigate(`/?page=${pageInfo.nextPageNumber}`)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            )}
            <Button
              onClick={() => navigate(`/?page=${pageInfo.lastPageNumber}`)}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          </Box>
        </ButtonGroup>
      </Center>
    </Box>
  );
}
