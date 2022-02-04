import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { View, Container, Text, Pressable, Image } from "native-base";

export default function App({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [camera, setCamera] = useState(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const submitToGoogle = async (capturedImage) => {
		console.log("👋 from submit to google capturedImage ------>", capturedImage);
		try {
			let body = JSON.stringify({
				requests: [
					{
						features: [{ type: "TEXT_DETECTION" }, { type: "DOCUMENT_TEXT_DETECTION" }],
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
			console.log("👋 error from submit to google ------>", error);
		}
	};

	const capture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync({ base64: true, quality: 0.3 });
			setImage(data.base64);
			submitToGoogle(data.base64);
		}
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View flex={1}>
			<Camera style={{ flex: 1 }} type={type} ref={(ref) => setCamera(ref)}>
				<Container flex={1} backgroundColor="transparent" flexDirection={"row"} mb="10" ml="5">
					<Pressable
						flex={0.1}
						alignSelf="flex-end"
						alignItems="center"
						onPress={() => {
							setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
						}}
					>
						<Text color="white" fontSize="lg">
							Flip
						</Text>
					</Pressable>
					<Pressable flex={0.9} alignSelf="flex-end" alignItems="center" onPress={() => capture()}>
						<Text color="white" fontSize="lg">
							Capture
						</Text>
					</Pressable>
				</Container>
			</Camera>
		</View>
	);
}
