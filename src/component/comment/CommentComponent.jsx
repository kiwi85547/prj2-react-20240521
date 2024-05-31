import { Box, Heading } from "@chakra-ui/react";
import { CommentWrite } from "./CommentWrite.jsx";
import { CommentList } from "./CommentList.jsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

export function CommentComponent({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <Box>
      <Box>
        <Heading>
          <FontAwesomeIcon icon={faComments} /> COMMENTS
        </Heading>
        <Box mb={7}>
          <CommentWrite
            boardId={boardId}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        </Box>
        <CommentList
          boardId={boardId}
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
        />
      </Box>
    </Box>
  );
}
