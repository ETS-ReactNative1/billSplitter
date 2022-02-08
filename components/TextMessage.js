import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Text,
  Pressable,
} from 'native-base';
import React, { useState } from 'react';

export default function TextMessage({ navigation }) {
  return (
    <Box
      flex={1}
      bg="#fff"
      alignItems="center"
      justifyContent="center"
    >
      <Center>
        <Text fontSize="2xl">
          Congrats! All of your friends have been alerted via text
          message!
        </Text>
      </Center>
    </Box>
  );
}
