import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { View, Text, Pressable, Image, Flex, Button, Heading, Spinner } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function App({ navigation }) {
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

	const submitToGoogle = async (capturedImage) => {
		try {
			let body = JSON.stringify({
				requests: [
					{
						features: [{ type: "TEXT_DETECTION" }],
						image: {
							content: capturedImage,
						},
					},
				],
			});
			let response = await fetch(
				"https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDf9qZKNsKcL0ATHdxZGsjgWWj6Ga5an0Q",
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "POST",
					body: body,
				}
			);
			let { responses } = await response.json();
			console.log("👋  ------>", responses);
			console.log("👋 response res ------>", responses[0].fullTextAnnotation.text);
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
				<Button alignItems="center" w={48} p={3} onPress={() => submitToGoogle(image)}>
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
				<Flex
					alignItems="flex-end"
					flex={1}
					justifyContent={"space-around"}
					backgroundColor="transparent"
					flexDirection={"row"}
					mb="10"
				>
					<Pressable alignItems="center" onPress={() => pickImage()}>
						<FontAwesome name="photo" size={32} color="white" />
					</Pressable>
					<Pressable alignItems="center" onPress={() => capture()}>
						<Text color="white" fontSize="xl">
							Capture
						</Text>
					</Pressable>
					<Pressable
						alignItems="center"
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
