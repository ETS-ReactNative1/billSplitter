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

			// console.log("This is Image in the camera Component, after setting Image", image);
			const formData = new FormData();
			formData.append("language", "eng");
			formData.append("isOverlayRequired", "false");
			formData.append("url", "http://dl.a9t9.com/ocrbenchmark/eng.png");

			const headers = {
				headers: {
					Accept: "application/json",
					"Content-Type": "multipart/form-data",
					apiKey: "K81848835288957",
					// ...formData.getHeaders(),
				},
			};

			// const body = {
			// 	language: "eng",
			// 	isOverlayRequired: false,
			// 	url: "http://dl.a9t9.com/ocrbenchmark/eng.png",
			// 	// filetype: "png",
			// };

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
