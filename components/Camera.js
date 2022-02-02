import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { View, Container, Text, Pressable, Image } from "native-base";
const axios = require("axios");
import FormData from "form-data";

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

	const capture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync({ base64: true });
			// console.log("This is data in the Camera Component", data);
			setImage(data.base64);

			console.log("This is Image in the camera Component, after setting Image", image);
			const formData = new FormData();
			formData.append("language", "eng");
			formData.append("isOverlayRequired", "false");
			formData.append(
				"base64Image",
				"data:image/jpeg;base64,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"
			);

			const headers = {
				headers: {
					Accept: "application/json",
					"Content-Type": "multipart/form-data",
					apiKey: "K81848835288957",
					// ...formData.getHeaders(),
				},
			};

			const res = await axios.post("https://api.ocr.space/parse/image", formData, headers);

			console.log("👋 result ------>", res.data);

			/*
       STEP 1 : have image = base64 string
       STEP 2 : make axios call to api route
       STEP 3 : Receive text from image conversion
       STEP 4 : Pass that text to OCR COmponent for the user to view!
       */

			// navigation.navigate("OCRComponent");
		}
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	//this shows the image after capture delete if not needed
	// if (image) {
	//   return <Image source={{ uri: image }} flex={1} alt="receipt" />;
	// }

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
