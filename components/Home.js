import { Box, Button, Container, Flex, Heading, Image, Pressable, Text } from "native-base";
import { Alert } from "react-native";
import icon from "../assets/Billsplitter_icon.png";

export default function Home({ navigation }) {
	return (
		<Flex flex={1} flexDirection="column" justifyContent="center" pb="32">
			<Box alignSelf="center">
				<Text pt={10} fontSize="2xl">
					Bill Splitter
				</Text>
				<Image alignSelf="center" justifyContent="flex-start" borderRadius="10" size="100" source={icon} alt="icon" />
			</Box>

			<Pressable onPress={() => navigation.navigate("CreateBill")}>
				<Text underline pt={20} alignSelf="center" fontSize="5xl">
					Create New Bill
				</Text>
			</Pressable>
		</Flex>
	);
}
