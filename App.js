import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";

import Home from "./components/Home";
import Color from "./components/Color";
import CreateBill from "./components/CreateBill";
import Camera from "./components/Camera";
import BillScreen from "./components/BillPage/BillScreen";
import FinalizedBill from "./components/FinalizedBill";
import TextMessage from "./components/TextMessage";
//stack navigation
const Stack = createStackNavigator();

export default function App() {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerTintColor: "white",
						headerStyle: { backgroundColor: "#06b6d4" },
					}}
				>
					<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
					<Stack.Screen name="Color" component={Color} />
					<Stack.Screen name="CreateBill" component={CreateBill} />
					<Stack.Screen name="Camera" component={Camera} options={{ title: "Capture" }} />
					<Stack.Screen name="BillScreen" component={BillScreen} />
					<Stack.Screen name="FinalizedBill" component={FinalizedBill} />
					<Stack.Screen name="TextMessage" component={TextMessage} />
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style="auto" />
		</NativeBaseProvider>
	);
}
