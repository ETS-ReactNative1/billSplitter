import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
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

	const capture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			setImage(data.uri);
			//The image uri is in the image state after capture
			//You can pass the image to a new view by using navigation
			console.log("👋  ------>", image); //--> prints the captured image uri
		}
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	//this shows the image after capture delete if not needed
	if (image) {
		return <Image source={{ uri: image }} flex={1} alt="receipt" />;
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
