import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
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
  faComments,
  faHeart,
  faImage,
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
  // 주소창에 입력한 쿼리스트링을 담고 있음
  // 1. 리액트 라우터 쿼리스트링 설정
  //  1-1) /board/id=1 useParams() :id
  //  1-2) /board?id=1 useSearchParams()
  const [searchParams] = useSearchParams();

  // list?page=2 프론트 url
  // /?page=2 백엔드 url
  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });

    // type:all, keyword:최고
    setSearchType("all");
    setSearchKeyword("");

    // http://localhost:5173/?type=all&keyword
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

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/?${searchParams}`);
  }

  // {id:5, title:"제목1", writer : "누구1"}]
  return (
    <Box>
      <Box mb={10}>
        <Heading>게시물 목록</Heading>
      </Box>
      <Box mb={10}>
        {boardList.length === 0 && <Center>조회 결과가 없습니다.</Center>}
        {boardList.length > 0 && (
          <Table>
            <Thead>
              <Tr>
                <Th w={20}>#</Th>
                <Th>TiTle</Th>
                <Th w={20}>
                  <FontAwesomeIcon icon={faHeart} />
                </Th>
                <Th w={40}>
                  <FontAwesomeIcon icon={faUserPen} />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr
                  cursor={"pointer"}
                  _hover={{ bgColor: "gray.200" }}
                  onClick={() => navigate(`/board/${board.id}`)}
                  key={board.id}
                >
                  <Td>{board.id}</Td>
                  <Td>
                    {board.title}
                    {board.numberOfImages > 0 && (
                      <Badge ml={2}>
                        <Flex gap={1}>
                          <Box>
                            <FontAwesomeIcon icon={faImage} />
                          </Box>
                          <Box>{board.numberOfImages}</Box>
                        </Flex>
                      </Badge>
                    )}
                    {board.numberOfComments > 0 && (
                      <Badge ml={2}>
                        <Flex gap={1}>
                          <Box>
                            <FontAwesomeIcon icon={faComments} />
                          </Box>
                          <Box>{board.numberOfComments}</Box>
                        </Flex>
                      </Badge>
                    )}
                  </Td>
                  <Td>{board.numberOfLike > 0 && board.numberOfLike}</Td>
                  <Td>{board.writer}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      <Center mb={10}>
        <Flex gap={1}>
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
        <Flex gap={1}>
          <Box>
            {/* 처음 버튼, 이전 버튼 조건이 같음. 여러개의 컴포넌트이면 <></>로 감싸기*/}
            {pageInfo.prevPageNumber && (
              <>
                <Button onClick={() => navigate(`/?page=1`)}>
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </Button>
                <Button
                  onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
              </>
            )}
            {/* localhost:5173/?page=1 */}
            {pageNumbers.map((pageNumber) => (
              <Button
                // onClick={() => navigate(`/?page=${pageNumber}`)}
                // onClick={someMethod1} // 함수 자체
                // onClick={someMethod2()} // 리턴된 결과
                // onClick={()=>someMethod3(pageNumber)} // 파라미터를 넣을 수 있음

                onClick={() => handlePageButtonClick(pageNumber)}
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
                onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            )}
            <Button
              onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
