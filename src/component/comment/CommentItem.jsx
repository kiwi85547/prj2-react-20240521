import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentItem(props) {
  return;
  <Box key={comment.id} border={"1px solid black"} my={3}>
    <Flex>
      <Box>{comment.nickName}</Box>
      <Spacer />
      <Box>{comment.inserted}</Box>
      <Box>{comment.comment}</Box>
    </Flex>
  </Box>;
}
