import React, { useState } from "react";
import {
  Input,
  FlatList,
  IconButton,
  Checkbox,
  Text,
  Avatar,
  Box,
  VStack,
  HStack,
  Heading,
  Spacer,
  FormControl,
  Modal,
  Icon,
  Flex,
  Center,
  NativeBaseProvider,
  ScrollView,
  Select,
  CheckIcon,
  Button,
} from "native-base";
import {
  Feather,
  Entypo,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";

import UserModal from "./UserModal";
import UsersList from "./UsersList";
import FinalizedBill from "../FinalizedBill";

const BillScreen = ({ userList, navigation }) => {
  const instState = [
    {
      name: "Cheeseburger",
      price: 5.99,
      assignee: "None",
    },
    {
      name: "Beer",
      price: 1.99,
      assignee: "None",
    },
    {
      name: "Fries",
      price: 0.99,
      assignee: "None",
    },
  ];

  const [list, setList] = useState(instState);
  const [user, setUser] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const addItem = (name, price) => {
    validation(name, price)
      ? setList([
          ...list,
          {
            name: name,
            price: price,
            assignee: "none",
          },
        ])
      : null;
  };

  const validation = (name, price) => {
    if (name && !isNaN(price)) return true;
    else {
      return false;
    }
  };

  const handleDelete = (index) => {
    const temp = list.filter((_, itemI) => itemI !== index);
    setList(temp);
  };

  const handleUserChange = (selectedUser, itemI) => {
    setUser(selectedUser);
    let tempList = [...list];
    let counter = 0;
    for (let item of tempList) {
      if (counter === itemI) {
        item.assignee = selectedUser;
      }
      counter++;
    }
    setList([...tempList]);
    setUser("");
  };
  // function populateMenu(data, itemIndex) {
  //   return data.map((singlePerson, i) => {
  //     return (
  //       <Select.Item
  //         label={singlePerson}
  //         value={singlePerson}
  //         key={Math.random()}
  //       />
  //     );
  //   });
  // }

  const finalizeBill = () => {
    console.log("Bill is now finalizing");
    navigation.navigate("FinalizedBill");
  };

  return (
    <Center w="100%" pt="24">
      <Box maxW="350" w="100%" pt="10">
        <Center w="100%">
          <Heading mb="10" size="xl">
            Your Current Bill
          </Heading>
        </Center>
        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={2}
              onChangeText={(v) => setItemName(v)}
              value={itemName}
              placeholder="Add new item..."
            />
            <Input
              flex={1}
              onChangeText={(v) => setItemPrice(v)}
              value={itemPrice.toString()}
              placeholder="Add Price..."
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={
                <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
              }
              onPress={() => {
                addItem(itemName, itemPrice);
                setItemName("");
                setItemPrice("");
              }}
              colorScheme="green"
            />
          </HStack>

          <ScrollView>
            <VStack space={2} pb="30">
              {list.map((item, itemI) => (
                <HStack
                  w="100%"
                  justifyContent="center"
                  key={item.name + itemI.toString()}
                >
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
                    <Text mx="2">{item.name}</Text>
                  </HStack>
                  <HStack w="50%" justifyContent="flex-end" space={2}>
                    <Select
                      selectedValue={item.assignee}
                      minWidth={70}
                      accessibilityLabel="Select use"
                      placeholder="Select"
                      onValueChange={(itemValue) =>
                        handleUserChange(itemValue, itemI)
                      }
                      _selectedItem={{
                        bg: "cyan.600",
                        endIcon: <CheckIcon size={4} />,
                      }}
                    >
                      {userList.map((singlePerson, i) => (
                        <Select.Item
                          label={singlePerson}
                          value={singlePerson}
                          key={singlePerson + i.toString() + itemI.toString()}
                        />
                      ))}
                    </Select>
                    <Text style={{ fontWeight: "bold" }}>
                      {"$" + String(item.price)}
                    </Text>
                  </HStack>
                </HStack>
              ))}

              <Button
                colorScheme="green"
                shadow={2}
                style={{ borderRadius: 0 }}
                onPress={() => finalizeBill()}
              >
                Finalize Bill
              </Button>
            </VStack>
          </ScrollView>
        </VStack>
      </Box>
    </Center>
  );
};

export default ({ navigation }) => {
  const [userList, setUserList] = useState([
    "Justin",
    "Marco",
    "Lane",
    "Johan",
  ]);
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" pb="250">
        <BillScreen userList={userList} navigation={navigation} />
      </Center>
      <UserModal setUserList={setUserList} userList={userList} />
    </NativeBaseProvider>
  );
};
