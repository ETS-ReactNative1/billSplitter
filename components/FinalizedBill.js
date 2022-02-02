import React from "react";
import {
  Input,
  IconButton,
  Button,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  NativeBaseProvider,
} from "native-base";
import {
  Feather,
  Entypo,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";

export default function FinalizedBill ({navigation}) {
  const instState = [
    {
      title: "Cheeseburger",
      price: 10,
      assignee: 'Johan'
    },
    {
      title: "Beer",
      price: 8,
      assignee: 'Lane'
    },
    {
      title: "Fries",
      price: 9,
      assignee: 'Justin'
    },
    {
      title: "Cheeseburger",
      price: 10,
      assignee: 'Marco'
    },
    {
      title: "Beer",
      price: 8,
      assignee: 'Marco'
    },
    {
      title: "Fries",
      price: 9,
      assignee: 'Justin'
    }
  ];
  const [list, setList] = React.useState(instState);

  return (
    <Center w="100%">
      <Box maxW="350" w="100%">
        <Center w="100%">
          <Heading mb="10" size="xl">
            Your Finalized Bill
          </Heading>
        </Center>
        <VStack space={2}>
          {list.map((item, index) => (
          <HStack key={index} w="100%" justifyContent="center">
            <HStack w="50%" justifyContent="flex-start">
             <Text mx="2">{item.title}</Text>
             <Text mx="2">{item.price}</Text>
            </HStack>
            <HStack w="50%" justifyContent="flex-end" space={2}>
              <Text mx="2">{item.assignee}</Text>
            </HStack>
          </HStack>
          ))}
        </VStack>

      </Box>
    </Center>
  );
};
