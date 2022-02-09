import { Box, Button, Center, FormControl, Heading, Input, Text, Pressable, KeyboardAvoidingView } from "native-base";
import React, { useState } from "react";

export default function CreateBill({ navigation }) {
	const [billName, setBillName] = useState("");
	const [payer, setPayer] = useState("");

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
					<FormControl.HelperText mb="8">Give your bill a name</FormControl.HelperText>
					<Text fontSize="4xl">Payer</Text>
					<Input
						fontWeight={"light"}
						variant="underlined"
						width="64"
						fontSize="24"
						value={payer}
						onChangeText={(v) => setPayer(v)}
					/>
					<FormControl.HelperText mb={12}>Specify the payer of the bill</FormControl.HelperText>
					<Button onPress={() => navigation.navigate("Camera", { billName, payer })}>
						<Text fontSize="xl" color="white">
							Next
						</Text>
					</Button>
				</FormControl>
			</Center>
		</KeyboardAvoidingView>
	);
}
