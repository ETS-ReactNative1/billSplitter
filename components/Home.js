import { Box, Button, Heading } from "native-base";
import { Alert } from "react-native";

export default function Home({ navigation }) {
  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
      <Heading>Bill Splitter</Heading>
      <Button
        variant="link"
        size="lg"
        onPress={() => navigation.navigate("Color")}
      >
        Color
      </Button>
      <Button
        variant="link"
        size="lg"
        onPress={() => navigation.navigate("CreateBill")}
      >
        Add Bill
      </Button>

      <Button
        variant="link"
        size="lg"
        onPress={() => navigation.navigate("BillScreen")}
      >
        Edit Bill
      </Button>

      <Button
        variant="link"
        size="lg"
        onPress={() => navigation.navigate("FinalizedBill")}
      >
        View Finalized Bill Example
      </Button>
    </Box>
  );
}
