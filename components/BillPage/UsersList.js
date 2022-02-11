import React from "react";
import {
	Box,
	FlatList,
	Heading,
	Avatar,
	HStack,
	VStack,
	Text,
	Spacer,
	Center,
	NativeBaseProvider,
	ScrollView,
	Flex,
} from "native-base";

export default function UsersList(props) {
	return (
		<Center>
			<Box maxW="80%" justifyContent="center" pb="5">
				<Flex flexDirection="row" justifyContent="center" flexWrap="wrap">
					<ScrollView horizontal={true} automaticallyAdjustContentInsets={true}>
						{props.userList.map((user, userI) => (
							<Box
								borderRadius={5}
								m="1"
								borderColor
								backgroundColor={"primary.500"}
								key={user + userI.toString()}
								p="1"
							>
								<Text p={1} fontSize="xl" color={"white"}>
									{user}
								</Text>
							</Box>
						))}
					</ScrollView>
				</Flex>
			</Box>
		</Center>
	);
}
