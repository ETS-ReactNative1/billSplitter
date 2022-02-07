import React from "react";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  Flex,
} from "native-base";

export default function UsersList(props) {
  return (
    <Center>
      <Box maxW="80%" justifyContent="center" pb="5">
        <Center>
          <Heading fontSize="xl" p="3" pb="0" pl="5">
            Users
          </Heading>
        </Center>
        <Flex flexDirection="row" justifyContent="center" flexWrap="wrap">
          {props.userList.map((user, userI) => (
            <Text key={user + userI.toString()} fontSize="lg" p="1">
              {user}
            </Text>
          ))}
        </Flex>
      </Box>
    </Center>
  );
}
