import React from 'react';
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
  FlatList,
} from 'native-base';
import {
  Feather,
  Entypo,
  FontAwesome,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { Alert, View, StyleSheet } from 'react-native';

import TextMessage from './TextMessage';

export default function FinalizedBill({ navigation, route }) {
  const billName = route.params.billName;
  const payer = route.params.payer;
  const billItems = route.params.list;
  console.log('billnamemeeee ', billName);

  // dummy data for what should be in state when this component loads.
  const dummyList = [
    {
      title: 'Cheeseburger',
      price: 10.0,
      assignee: 'Johan',
      payer: false,
    },
    {
      title: 'Beer',
      price: 8.0,
      assignee: 'Lane',
      payer: false,
    },
    {
      title: 'Fries',
      price: 9.0,
      assignee: 'Justin',
      payer: false,
    },
    {
      title: 'Cheeseburger',
      price: 10.0,
      assignee: 'Marco',
      payer: true,
    },
    {
      title: 'Beer',
      price: 8.0,
      assignee: 'Marco',
      payer: true,
    },
    {
      title: 'Fries',
      price: 9.0,
      assignee: 'Justin',
      payer: false,
    },
  ];

  // parses through inputted item list and turns it into an object
  // containing:
  // finalBill.payer: string of payer's name.
  //, finalBill.billItems: array of objects (name, price, assignee, payer)
  // finalBill.totals: array of objects (assignee, total, payer(T/F)
  const finalizeBill = (list) => {
    let finalBill = {};
    let party = [];
    let totals = [];

    finalBill.payer = payer;

    //copy over bill items to the final bill.
    const billItems = list.map((item) => {
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

  const finalBill = finalizeBill(billItems);

  const [bill, setBil] = React.useState(finalBill);

  const billIsFinal = () => {
    console.log('billisFinal has been clicked!!!');
    finalizeAlert();
  };

  const finalizeAlert = () => {
    Alert.alert(
      'Confirm before submitting!',
      'Does everything look good?',
      [
        {
          text: 'Looks Good!',
          onPress: () => {
            console.log('Looks Good Pressed!');
            navigation.navigate('TextMessage');
          },
        },
        {
          text: 'Go back!',
          onPress: () => {
            console.log('Go back was pressed!');
            return;
          },
        },
      ],
    );
  };
  const currencyConverter = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(number);
  };

  return (
    <Center w="100%">
      <Box maxW="350" w="100%">
        <Center w="100%">
          <Heading m="10" size="xl">
            <Text style={{ textDecorationLine: 'underline' }}>
              {`Your Final Bill: ${billName}`}
            </Text>
          </Heading>
        </Center>

        <VStack space={2}>
          {bill.billItems.map((item, index) => (
            <HStack key={index} w="100%" justifyContent="center">
              <HStack w="50%" justifyContent="flex-start">
                <Text mx="2">{item.name}</Text>
              </HStack>
              <HStack w="20%" justifyContent="center">
                <Text mx="2" style={{ fontWeight: 'bold' }}>
                  {currencyConverter(item.price)}
                </Text>
              </HStack>
              <HStack w="20%" justifyContent="flex-end" space={2}>
                <Text mx="2">{item.assignee}</Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
        <Center w="100%">
          <Heading m="10" size="xl">
            <Text style={{ textDecorationLine: 'underline' }}>
              Totals per Person!
            </Text>
          </Heading>
        </Center>
        <VStack space={2}>
          {bill.totals.map((total, index) => (
            <HStack key={index} w="100%" justifyContent="center">
              <HStack w="45%" justifyContent="flex-start">
                <Text mx="2">{total.assignee}</Text>
                <Text mx="2">
                  {bill.payer === total.assignee
                    ? 'paid for themself'
                    : `owes ${bill.payer}`}
                </Text>
              </HStack>
              <HStack w="45%" justifyContent="flex-end" space={2}>
                <Text mx="2" style={{ fontWeight: 'bold' }}>
                  {currencyConverter(total.total)}
                </Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
        <Button
          colorScheme="green"
          shadow={2}
          style={{ borderRadius: 0 }}
          onPress={() => billIsFinal()}
        >
          Finalize Bill!
        </Button>
      </Box>
    </Center>
  );
}
