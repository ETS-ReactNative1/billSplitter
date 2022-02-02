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
      title: "Code",
      isCompleted: true,
    },
    {
      title: "Meeting with team at 9",
      isCompleted: true,
    },
    {
      title: "Check Emails",
      isCompleted: false,
    },
    {
      title: "Write an article",
      isCompleted: false,
    },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");

  const addItem = (title) => {
    setList([
      ...list,
      {
        title: title,
        isCompleted: false,
      },
    ]);
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
            Your Current Bills
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
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.title + itemI.toString()}
              >
                {/* <Checkbox
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                > */}
                <Text
                  mx="2"
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? "gray.400" : "coolGray.800",
                  }}
                  _dark={{
                    color: item.isCompleted ? "gray.400" : "coolGray.50",
                  }}
                >
                  {item.title}
                </Text>
                {/* </Checkbox> */}

                <HStack
                  w="50%"
                  justifyContent="flex-end"
                  alignItems="center"
                  key={item.title + itemI.toString()}
                >
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
                    onPress={() => handleDelete(itemI)}
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
                    onPress={() => handleDelete(itemI)}
                  />

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
