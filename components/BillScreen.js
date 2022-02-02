import React from "react";
import {
  Input,
  IconButton,
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

const BillScreen = () => {
  const instState = [
    {
      title: "Cheeseburger",
      quantity: 6,
    },
    {
      title: "Beers",
      quantity: 6,
    },
    {
      title: "Fries",
      quantity: 6,
    },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");

  const addItem = (title) => {
    setList([
      ...list,
      {
        title: title,
        quantity: 1,
      },
    ]);
  };

  const handleSubtract = (index) => {
    let temp = [...list];
    let counter = 0;
    for (let item of temp) {
      if (index === counter && item.quantity >= 2) {
        item.quantity--;
      }
      counter++;
    }
    setList(temp);
  };

  const handleAdd = (index) => {
    let temp = [...list];
    let counter = 0;
    for (let item of temp) {
      if (index === counter) {
        item.quantity++;
      }
      counter++;
    }
    setList(temp);
  };

  const handleDelete = (index) => {
    const temp = list.filter((_, itemI) => itemI !== index);
    setList(temp);
  };

  const handleStatusChange = (index) => {
    const temp = list.map((item, itemI) =>
      itemI !== index ? item : { ...item, isCompleted: !item.isCompleted }
    );
    setList(temp);
  };

  return (
    <Center w="100%">
      <Box maxW="350" w="100%">
        <Center w="100%">
          <Heading mb="10" size="xl">
            Your Current Bill
          </Heading>
        </Center>
        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={1}
              onChangeText={(v) => setInputValue(v)}
              value={inputValue}
              placeholder="Add new item..."
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={
                <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
              }
              onPress={() => {
                addItem(inputValue);
                setInputValue("");
              }}
              colorScheme="green"
            />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => (
              <HStack w="100%" justifyContent="center">
                <HStack w="50%" justifyContent="flex-start">
                  <IconButton
                    size="sm"
                    colorScheme="trueGray"
                    icon={
                      <Icon
                        as={FontAwesome}
                        name="trash-o"
                        size="xs"
                        color="trueGray.400"
                      />
                    }
                    onPress={() => handleDelete(itemI)}
                  />
                  <Text mx="2">{item.title}</Text>
                </HStack>
                <HStack w="50%" justifyContent="flex-end" space={2}>
                  <Text style={{ fontWeight: "bold" }}>{item.quantity}</Text>
                  <IconButton
                    size="sm"
                    colorScheme="trueGray"
                    icon={
                      <Icon
                        as={SimpleLineIcons}
                        name="minus"
                        size="xs"
                        color="trueGray.400"
                      />
                    }
                    onPress={() => handleSubtract(itemI)}
                  />

                  <IconButton
                    size="sm"
                    colorScheme="trueGray"
                    icon={
                      <Icon
                        as={SimpleLineIcons}
                        name="plus"
                        size="xs"
                        color="trueGray.400"
                      />
                    }
                    onPress={() => handleAdd(itemI)}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <BillScreen />
      </Center>
    </NativeBaseProvider>
  );
};
