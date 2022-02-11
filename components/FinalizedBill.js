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

  //grab data passed from previous screens.
  const billName = route.params.billName;
  const payer = route.params.payer;
  const billItems = route.params.list;
  const tip = route.params.tip ? route.params.tip/100 : .015;
  const tax = route.params.tax ? route.params.tip/100 : .0875;
  console.log('billnamemeeee ', billName);

  // parses through inputted item list and turns it into an object containing:
  // 1. finalBill.payer: string of payer's name.
  // 2. finalBill.billItems: array of objects (name, price, assignee, payer)
  // 3. finalBill.totals: array of objects (assignee, total, payer(T/F)
  // 4. finalBIll.billParty: array of unique members of the dining party.
  const finalizeBill = (list) => {
    let finalBill = {};
    let party = [];
    let totals = [];

    // add the payer, passed from the AddBill.js screen.
    finalBill.payer = payer;
    finalBill.subtotal = 0;

    //copy over bill items passed from BillScreen.js.
    //build the bill total along the way.
    const billItems = list.map((item) => {
      //build the party of unique members.
      if (!party.includes(item.assignee)) {
        party.push(item.assignee);
      }
      finalBill.subtotal += parseInt(item.price);
      return item;
    });
    finalBill.billItems = billItems;
    finalBill.party = party;

    //calculate tip for the bill
    finalBill.tip = tip * finalBill.subtotal;

    //calculate tax for the bill:
    finalBill.tax = tax * finalBill.subtotal;

    //calculate bill grand total:
    finalBill.grandTotal = finalBill.subtotal + finalBill.tax + finalBill.tip;

    //tabulate up per-person sub totals
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

    // apply tip and tax to each person's item total.
    finalBill.totals.forEach((personTotal) => {
      personTotal.total = personTotal.total * (1 + tax) * (1 + tip);
    });
    console.log("final bill, ", finalBill)
    return finalBill;
  };

  const finalBill = finalizeBill(billItems);

  const [bill, setBill] = React.useState(finalBill);

  const billIsFinal = () => {
    // console.log('billisFinal has been clicked!!!');
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
  // console.log('THIS IS BILL', bill);
  // console.log('THIS IS BILLITEMS', bill.billItems);

  // const styles = StyleSheet.create({
  //   body: {
  //     backgroundColor: 'white',
  //     flex: 1,
  //   },
  //   listWrapper: {
  //     flexDirection: 'row',
  //     flexWrap: 'wrap',
  //     borderBottomWidth: 5,
  //   },
  //   row: {
  //     backgroundColor: 'white',
  //     flex: 1,
  //     fontSize: 14,
  //     paddingHorizontal: 2,
  //     paddingVertical: 30,
  //   },
  // });
  return (
    <Center w="100%">
      <Box maxW="400" w="100%">

        {/* Header containing bill name */}
        <Center w="100%">
          <Heading m="10" size="xl">
            <Text >
              Bill Name: {"\n"}
              {billName}
            </Text>
          </Heading>
        </Center>

        {/* Bill by Item */}
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
          {/* Subtotal */}
          <HStack w="100%" justifyContent="center">
              <HStack w="50%" justifyContent="flex-start">
                <Text mx="2">Subtotal</Text>
              </HStack>
              <HStack w="20%" justifyContent="center">
                <Text mx="2" style={{ fontWeight: 'bold' }}>
                  {currencyConverter(finalBill.subtotal)}
                </Text>
              </HStack>
              <HStack w="20%" justifyContent="flex-end" space={2}>
                <Text mx="2"></Text>
              </HStack>
            </HStack>

            {/* Tax */}
            <HStack w="100%" justifyContent="center">
              <HStack w="50%" justifyContent="flex-start">
                <Text mx="2">Tax</Text>
              </HStack>
              <HStack w="20%" justifyContent="center">
                <Text mx="2" style={{ fontWeight: 'bold' }}>
                  {currencyConverter(finalBill.tax)}
                </Text>
              </HStack>
              <HStack w="20%" justifyContent="flex-end" space={2}>
                <Text mx="2"></Text>
              </HStack>
            </HStack>

            {/* Tip */}
            <HStack w="100%" justifyContent="center">
              <HStack w="50%" justifyContent="flex-start">
                <Text mx="2">Tip</Text>
              </HStack>
              <HStack w="20%" justifyContent="center">
                <Text mx="2" style={{ fontWeight: 'bold' }}>
                  {currencyConverter(finalBill.tip)}
                </Text>
              </HStack>
              <HStack w="20%" justifyContent="flex-end" space={2}>
                <Text mx="2"></Text>
              </HStack>
            </HStack>

            {/* Grand Total */}
            <HStack w="100%" justifyContent="center">
              <HStack w="50%" justifyContent="flex-start">
                <Text mx="2">Grand Total</Text>
              </HStack>
              <HStack w="20%" justifyContent="center">
                <Text mx="2" style={{ fontWeight: 'bold' }}>
                  {currencyConverter(finalBill.grandTotal)}
                </Text>
              </HStack>
              <HStack w="20%" justifyContent="flex-end" space={2}>
                <Text mx="2"></Text>
              </HStack>
            </HStack>





        </VStack>

        {/* Header for "per person" totals */}
        <Center w="100%">
          <Heading m="10" size="xl">
            <Text>
              Totals per Person
            </Text>
          </Heading>
        </Center>

        {/* Per person totals */}
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


        {/* <Button
          colorScheme="green"
          shadow={2}
          style={{ borderRadius: 0 }}
          onPress={() => billIsFinal()}
        >
          Finalize Bill!
        </Button> */}


      </Box>
    </Center>
  );
}
