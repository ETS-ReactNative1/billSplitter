import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { View, Container, Text, Pressable } from "native-base";

export default function App() {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View flex={1}>
			<Camera style={styles.camera} type={type}>
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
					<Pressable
						flex={0.9}
						alignSelf="flex-end"
						alignItems="center"
						onPress={() => console.log("👋 take pic ------>")}
					>
						<Text color="white" fontSize="lg">
							Snap
						</Text>
					</Pressable>
				</Container>
			</Camera>
		</View>
	);
}

const styles = StyleSheet.create({
	camera: {
		flex: 1,
	},
});
