import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";

export function BoardList() {
  const [boardList, setBoardList] = useState({});

  useEffect(() => {
    axios
      .get("/api/board/list")
      .then((res) => {
        setBoardList(res.data);
      })
      .catch()
      .finally();
  }, []);

  return <Box>응답되었습니다.</Box>;
}
