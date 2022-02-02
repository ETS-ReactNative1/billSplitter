import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";

import Home from "./components/Home";
import Color from "./components/Color";
import CreateBill from "./components/CreateBill";
import Camera from "./components/Camera";
import BillScreen from "./components/BillScreen";
import FinalizedBill from "./components/FinalizedBill";

//stack navigation
const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ header: () => null }}
          />
          <Stack.Screen name="Color" component={Color} />
          <Stack.Screen name="CreateBill" component={CreateBill} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="BillScreen" component={BillScreen} />
          <Stack.Screen name="FinalizedBill" component={FinalizedBill} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
