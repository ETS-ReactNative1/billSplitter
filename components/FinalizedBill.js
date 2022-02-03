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

  // dummy data for what should be in state when this component loads.
  const passedList = [
    {
      title: "Cheeseburger",
      price: 1000,
      assignee: 'Johan',
      payer: false
    },
    {
      title: "Beer",
      price: 800,
      assignee: 'Lane',
      payer: false
    },
    {
      title: "Fries",
      price: 900,
      assignee: 'Justin',
      payer: false
    },
    {
      title: "Cheeseburger",
      price: 1000,
      assignee: 'Marco',
      payer: true
    },
    {
      title: "Beer",
      price: 800,
      assignee: 'Marco',
      payer: true
    },
    {
      title: "Fries",
      price: 900,
      assignee: 'Justin',
      payer: false
    }
  ];

  const finalizeBill = (list) => {
    let finalBill = {};
    list.forEach(item => {
      if (item.payer === true){
        finalBill.payer = item.assignee
      }
    })

    //copy the list of menu items as store as .billItems
    const billItems = list.map(item => {
      console.log('bill item:', item);
      return item
    })
    finalBill.billItems = billItems;

    // get all unique members in the party and set the totals to $0.
    let party = []
    list.forEach(billItem => {
      if(!party.includes(billItem.assignee)){
        party.push(billItem.assignee)
      }
    })
    finalBill.party = party;

    //tabulate sub totals
    let totals = []
    party.forEach(person => {
      let personTotal = 0
      list.forEach(item => {
        if(item.assignee === person){
          personTotal += item.price
        }
      })
      let totalOrdered = {
        assignee: person,
        total: personTotal,
        payer: false
      }
      if(finalBill.payer === person){
        totalOrdered.payer = true
      }
      totals.push(totalOrdered)
    })
    finalBill.totals = totals

    // apply tip and tax.
    // hardcoded to be .0875% tax and 15% tip.
    // also not great at handling floating point math.
    finalBill.totals.forEach(personTotal => {
      personTotal.total = personTotal.total * 1.0875 * 1.15;
    })


    return finalBill;
  }

  const finalBill = finalizeBill(passedList)

  console.log('final bill ', finalBill)

  const [bill, setBil] = React.useState(finalBill);


  return (
    <Center w="100%">
      <Box maxW="350" w="100%">
        <Center w="100%">
          <Heading mb="10" size="xl">
            Your Finalized Bill
          </Heading>
        </Center>
        <VStack space={2}>
          {bill.billItems.map((item, index) => (
          <HStack key={index} w="100%" justifyContent="center">
            <HStack w="50%" justifyContent="flex-start">
             <Text mx="2">{item.title}</Text>
             {/* <Text mx="2">{item.price}</Text> */}
            </HStack>
            <HStack w="50%" justifyContent="center">
             {/* <Text mx="2">{item.title}</Text> */}
             <Text mx="2">{item.price}</Text>
            </HStack>
            <HStack w="50%" justifyContent="flex-end" space={2}>
              <Text mx="2">{item.assignee}</Text>
            </HStack>
          </HStack>
          ))}
        </VStack>

        <Center w="100%">
          <Heading mb="10" size="xl">
            Totals By Person
          </Heading>
        </Center>

        <VStack space={2}>
          {bill.totals.map((total, index) => (
            // hacky thing to avoid reusing index, should prob refactor this
          <HStack key={index} w="100%" justifyContent="center">
            <HStack w="50%" justifyContent="flex-start">
             <Text mx="2">{total.assignee}</Text>
             <Text mx="2">
             {bill.payer === total.assignee ? 'paid for themself': `owes ${bill.payer}`}
            </Text>
            </HStack>
            <HStack w="50%" justifyContent="flex-end" space={2}>
              <Text mx="2">{total.total}</Text>
            </HStack>
          </HStack>
          ))}
        </VStack>

      </Box>
    </Center>
  );
};
