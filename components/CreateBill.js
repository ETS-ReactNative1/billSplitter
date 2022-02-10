import { Button, Center, FormControl, Input, Text, KeyboardAvoidingView, Container } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";

export default function CreateBill({ navigation }) {
	const [billName, setBillName] = useState("");
	const [billNameErr, setBillNameErr] = useState(false);
	const [payer, setPayer] = useState("");
	const [payerErr, setPayerErr] = useState(false);

	const nextAlert = () => {
		Alert.alert("Field Required", "Please specify bill Name and payer.");
	};

	const errorMessage = () => {
		if (!billName) setBillNameErr(true);
		if (!payer) setPayerErr(true);
	};

	const pressHandle = () => {
		if (!billName.length || !payer.length) {
			setBillNameErr(false);
			setPayerErr(false);
			errorMessage();
			nextAlert();
			return;
		}
		navigation.navigate("Camera", { billName, payer });
	};

	return (
		<KeyboardAvoidingView behavior="padding" flex={1} bg="#fff" alignItems="center" justifyContent="center">
			<Center>
				<FormControl mb={24} pr="5">
					<Text fontSize="4xl">Bill Name</Text>
					<Input
						fontWeight={"light"}
						variant="underlined"
						width="64"
						fontSize="24"
						value={billName}
						onChangeText={(v) => setBillName(v)}
					/>
					<Container mb={8}>
						<FormControl.HelperText>Give your bill a name</FormControl.HelperText>
						{billNameErr && <Text color={"red.500"}>Required*</Text>}
					</Container>
					<Text fontSize="4xl">Payer</Text>
					<Input
						fontWeight={"light"}
						variant="underlined"
						width="64"
						fontSize="24"
						value={payer}
						onChangeText={(v) => setPayer(v)}
					/>
					<Container mb={8}>
						<FormControl.HelperText>Specify the payer of the bill</FormControl.HelperText>
						{payerErr && <Text color={"red.500"}>Required*</Text>}
					</Container>
					<Button onPress={pressHandle}>
						<Text fontSize="xl" color="white">
							Next
						</Text>
					</Button>
				</FormControl>
			</Center>
		</KeyboardAvoidingView>
	);
}
