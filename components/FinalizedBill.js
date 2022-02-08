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

export default function FinalizedBill({ navigation }) {
  // dummy data for what should be in state when this component loads.
  const dummyList = [
    {
      title: "Cheeseburger",
      price: 1000,
      assignee: "Johan",
      payer: false,
    },
    {
      title: "Beer",
      price: 800,
      assignee: "Lane",
      payer: false,
    },
    {
      title: "Fries",
      price: 900,
      assignee: "Justin",
      payer: false,
    },
    {
      title: "Cheeseburger",
      price: 1000,
      assignee: "Marco",
      payer: true,
    },
    {
      title: "Beer",
      price: 800,
      assignee: "Marco",
      payer: true,
    },
    {
      title: "Fries",
      price: 900,
      assignee: "Justin",
      payer: false,
    },
  ];

  // parses through inputted item list and turns it into an object
  // containing:
  // finalBill.payer: string of payer's name.
  //, finalBill.billItems: array of objects (title, price, assignee, payer)
  // finalBill.totals: array of objects (assignee, total, payer(T/F)
  const finalizeBill = (list) => {
    let finalBill = {};
    let party = [];
    let totals = [];

    //copy over bill items to the final bill.
    const billItems = list.map((item) => {
      //identify the payer.
      if (item.payer === true) {
        finalBill.payer = item.assignee;
      }
      //build the party of unique members.
      if (!party.includes(item.assignee)) {
        party.push(item.assignee);
      }

      return item;
    });
    finalBill.billItems = billItems;
    finalBill.party = party;

    //add up per-person sub totals
    party.forEach((person) => {
      let personTotal = 0;
      list.forEach((item) => {
        if (item.assignee === person) {
          personTotal += item.price;
        }
      });
      let totalOrdered = {
        assignee: person,
        total: personTotal,
        payer: false,
      };
      if (finalBill.payer === person) {
        totalOrdered.payer = true;
      }
      totals.push(totalOrdered);
    });
    finalBill.totals = totals;

    // apply tip and tax.
    // hardcoded to be .0875% tax and 15% tip.
    // also not great at handling floating point math.
    finalBill.totals.forEach((personTotal) => {
      personTotal.total = personTotal.total * 1.0875 * 1.15;
    });
    // console.log("Final Bill: ", finalBill);
    return finalBill;
  };

  const finalBill = finalizeBill(dummyList);

  const [bill, setBil] = React.useState(finalBill);

  return (
    <Center w="100%">
      <Box maxW="350" w="100%">
        <Center w="100%">
          <Heading m="10" size="xl">
            Your Finalized Bill
          </Heading>
        </Center>
        <VStack space={2}>
          {bill.billItems.map((item, index) => (
            <HStack key={index} w="100%" justifyContent="center">
              <HStack w="50%" justifyContent="flex-start">
                <Text mx="2">{item.title}</Text>
              </HStack>
              <HStack w="20%" justifyContent="center">
                <Text mx="2">{item.price}</Text>
              </HStack>
              <HStack w="20%" justifyContent="flex-end" space={2}>
                <Text mx="2">{item.assignee}</Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
        <Center w="100%">
          <Heading m="10" size="xl">
            Totals By Person
          </Heading>
        </Center>
        <VStack space={2}>
          {bill.totals.map((total, index) => (
            <HStack key={index} w="100%" justifyContent="center">
              <HStack w="45%" justifyContent="flex-start">
                <Text mx="2">{total.assignee}</Text>
                <Text mx="2">
                  {bill.payer === total.assignee
                    ? "paid for themself"
                    : `owes ${bill.payer}`}
                </Text>
              </HStack>
              <HStack w="45%" justifyContent="flex-end" space={2}>
                <Text mx="2">{total.total}</Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Center>
  );
}
