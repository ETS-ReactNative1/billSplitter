import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { View, Text, Pressable, Image, Flex, Button, Heading, Spinner } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import { apiKey } from "@env";
// console.log("this is process obj", process);
// console.log("this is apiKey in Camera.js", apiKey);

export default function App({ navigation, route }) {
	const { payer, billName } = route.params;
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [camera, setCamera] = useState(null);
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const fetchOCRData = async (capturedImage) => {
		setIsLoading(true);
		try {
			const fetchData = async () => {
				const base64Str = `data:image/jpg;base64, ${capturedImage}`;
				var data = new FormData();
				data.append("base64Image", base64Str);
				data.append("isTable", true);
				data.append("scale", true);
				data.append("OCREngine", 2);

				const headers = {
					Accept: "application/json",
					"Content-Type": "multipart/form-data;",
					apiKey: "K87273936188957",
				};
				const config = {
					method: "POST",
					headers,
					body: data,
				};
				const URL = "https://api.ocr.space/parse/image";
				const ocr = await fetch(URL, config);
				return ocr.json();
			};
			const ocr = await fetchData();
			setIsLoading(false);
			console.log("👋 Is Error Processing from ocr space fetch ------>", ocr.IsErroredOnProcessing);
			console.log("👋 Error Message from ocr space fetch ------>", ocr.ErrorMessage);

			const refineData = (data) => {
				let text = data?.ParsedResults[0]?.ParsedText.split(/\r?\n/);
				let arr = [];
				for (let i = 5; i < 9; i++) {
					const line = text[i].split("$");
					const name = line[0].slice(2);
					const price = line[1];
					const item = { name, price, assignee: null };
					arr.push(item);
				}
				return arr;
			};
			let OCRData = refineData(ocr);

			navigation.navigate("BillScreen", { OCRData, payer, billName });
		} catch (error) {
			console.log("error from submit to google ------>", error);
		}
	};

	const capture = async () => {
		if (camera) {
			const image = await camera.takePictureAsync({
				base64: true,
				quality: 0.3,
			});
			setImage(image.base64);
		}
	};

	const pickImage = async () => {
		setIsLoading(true);
		let image = await ImagePicker.launchImageLibraryAsync({
			quality: 0.3,
			base64: true,
		});
		if (!image.cancelled) {
			setImage(image.base64);
		}
		setIsLoading(false);
	};

	if (hasPermission === null) {
		return <View />;
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	if (isLoading) {
		return (
			<Flex flex={1} alignItems="center" justifyContent="center">
				<Spinner accessibilityLabel="loading" />
				<Heading color={"black"} fontSize="xl">
					Loading
				</Heading>
			</Flex>
		);
	}

	if (image) {
		return (
			<Flex flex={1} alignItems="center">
				<Image size={450} resizeMode="contain" alt="image" source={{ uri: `data:image/png;base64, ${image}` }} m={10} />
				<Button alignItems="center" w={48} p={3} onPress={() => fetchOCRData(image)}>
					<Text color="black" fontSize="xl">
						Next
					</Text>
				</Button>
				<Button alignItems="center" w={48} p={3} margin={3} onPress={() => setImage(null)}>
					<Text color="black" fontSize="xl">
						Try Again
					</Text>
				</Button>
			</Flex>
		);
	}

	return (
		<View flex={1}>
			<Camera style={{ flex: 1 }} type={type} ref={(ref) => setCamera(ref)}>
				<Pressable alignSelf="flex-end" p={2} onPress={() => navigation.navigate("BillScreen", { payer, billName })}>
					<Text color="white" fontSize="xl">
						Edit bill manually
					</Text>
				</Pressable>
				<Flex
					alignItems="flex-end"
					flex={1}
					justifyContent={"space-around"}
					backgroundColor="transparent"
					flexDirection={"row"}
					mb="10"
				>
					<Pressable onPress={() => pickImage()}>
						<FontAwesome name="photo" size={32} color="white" />
					</Pressable>
					<Pressable onPress={() => capture()}>
						<Text color="white" fontSize="xl">
							Capture
						</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
						}}
					>
						<MaterialIcons name="flip-camera-ios" size={36} color="white" />
					</Pressable>
				</Flex>
			</Camera>
		</View>
	);
}
