import { Box, Button, Center, FormControl, Heading, Input, Text, Pressable } from "native-base";
import React from "react";

export default function CreateBill() {
	return (
		<Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
			<Center>
				<FormControl mb="48" pr="5">
					<Text fontSize="4xl">Bill Name</Text>
					<Input variant="underlined" width="64" fontSize="24" />
					<FormControl.HelperText mb="8">Give your bill a name.</FormControl.HelperText>
					<Pressable>
						<Text fontSize="2xl">Next</Text>
					</Pressable>
				</FormControl>
			</Center>
		</Box>
	);
}
