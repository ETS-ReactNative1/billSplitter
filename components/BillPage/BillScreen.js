import React, { useState } from "react";
import {
	Input,
	IconButton,
	Text,
	Box,
	VStack,
	HStack,
	Heading,
	Icon,
	Center,
	NativeBaseProvider,
	ScrollView,
	Select,
	CheckIcon,
	Button,
	Divider,
	Container,
} from "native-base";

import { Alert } from "react-native";

import { Feather, Entypo, FontAwesome, SimpleLineIcons, AntDesign } from "@expo/vector-icons";

import UserModal from "./UserModal";
import Tips from "./Tips";
import UsersList from "./UsersList";
import FinalizedBill from "../FinalizedBill";

const BillScreen = ({ userList, navigation, billName, payer, OCRData, tip }) => {
	const instState = [
		{
			name: "Cheeseburger",
			price: 5.99,
			assignee: null,
		},
		{
			name: "Beer",
			price: 1.99,
			assignee: null,
		},
		{
			name: "Fries",
			price: 0.99,
			assignee: null,
		},
	];

	// const [list, setList] = useState(instState);

	const [list, setList] = useState(OCRData ? OCRData : []);
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
						assignee: null,
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

	const next = () => {
		// console.log("Bill is now finalizing");
		let tempList = [...list];
		console.log("Items", tempList);
		for (let item of tempList) {
			if (item.assignee === null) {
				console.log("There's something unassigned");
				openAssignAlert();
				return;
			}
		}
		console.log("Everything is assigned");
		navigation.navigate("FinalizedBill", { billName, payer, list, tip });
	};

	const openAssignAlert = () => {
		Alert.alert(
			"Unassigned Item!",
			"Please assign all items.",
			[
				{
					text: "Ok",
					onPress: () => console.log("Later button clicked"),
				},
			],
			{
				cancelable: false,
			}
		);
	};

	const handleTrashCan = (index) => {
		Alert.alert(
			"Are you sure you want to delete that item?",
			null,
			[{ text: "Yes", onPress: () => handleDelete(index) }, { text: "No" }],
			{ cancelable: false }
		);
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
						<Input flex={2} onChangeText={(v) => setItemName(v)} value={itemName} placeholder="Add new item..." />
						<Input
							flex={1}
							onChangeText={(v) => setItemPrice(v)}
							value={itemPrice.toString()}
							placeholder="Add Price..."
						/>
						<IconButton
							borderRadius="sm"
							variant="solid"
							icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />}
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
								<HStack w="100%" justifyContent="center" key={item.name + itemI.toString()}>
									<HStack w="50%" justifyContent="flex-start">
										<IconButton
											size="sm"
											alignSelf="center"
											colorScheme="trueGray"
											icon={<Icon as={FontAwesome} name="trash-o" size="xs" color="red.500" />}
											onPress={() => handleTrashCan(itemI)}
										/>
										<Text mx="2" alignSelf="center" fontSize="md">
											{item.name}
										</Text>
									</HStack>
									<HStack w="50%" justifyContent="flex-end" space={2}>
										<Select
											selectedValue={item.assignee}
											minWidth={70}
											accessibilityLabel="Select use"
											placeholder="Select"
											onValueChange={(itemValue) => handleUserChange(itemValue, itemI)}
											_selectedItem={{
												bg: "cyan.600",
												endIcon: <CheckIcon size={4} />,
											}}
											dropdownIcon={<Icon as={AntDesign} name="down" size={3} color="black" pr={4} />}
											alignSelf="center"
										>
											{userList.map((singlePerson, i) => (
												<Select.Item
													label={singlePerson}
													value={singlePerson}
													key={singlePerson + i.toString() + itemI.toString()}
												/>
											))}
										</Select>
										<Text fontSize="md" alignSelf="center" style={{ fontWeight: "bold" }}>
											{"$" + String(item.price)}
										</Text>
									</HStack>
								</HStack>
							))}

							<Button colorScheme="green" shadow={2} _text={{ fontSize: "md" }} onPress={() => next()}>
								Next
							</Button>
						</VStack>
					</ScrollView>
				</VStack>
			</Box>
		</Center>
	);
};
export default ({ navigation, route }) => {
	const [userList, setUserList] = useState([route?.params?.payer]);
	const [tips, setTips] = useState(15);

	return (
		<NativeBaseProvider>
			<Center flex={1} px="3" pb="300">
				<BillScreen
					userList={userList}
					navigation={navigation}
					payer={route?.params?.payer}
					billName={route?.params?.billName}
					OCRData={route?.params?.OCRData}
					tip={tips}
				/>
			</Center>
			<Divider backgroundColor="trueGray.300" />
			<Box backgroundColor="trueGray.200">
				<Tips setTips={setTips} tips={tips} />
				<UserModal setUserList={setUserList} userList={userList} />
			</Box>
		</NativeBaseProvider>
	);
};
