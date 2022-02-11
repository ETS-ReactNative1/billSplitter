import { Flex, Button, Text, Slider, Box, Heading, Input, KeyboardAvoidingView, Pressable } from "native-base";
import React, { useState } from "react";

function Tips({ setTips, tips }) {
	console.log("👋 tips ------>", tips);
	return (
		<Flex direction="row" m={1} alignItems="center" justifyContent="space-around" ml="3" mr="3">
			<Text fontSize="xl" fontWeight="semibold">
				Tips:
			</Text>
			<Button
				w={60}
				p="1"
				borderWidth={2}
				backgroundColor={tips === 15 ? "success.600" : "transparent"}
				borderColor="success.600"
				_text={{ fontSize: "md", color: tips === 15 ? "white" : "success.600", fontWeight: "bold" }}
				m="2"
				onPress={() => setTips(15)}
			>
				15%
			</Button>
			<Button
				w={60}
				p="1"
				borderWidth={2}
				backgroundColor={tips === 18 ? "success.600" : "transparent"}
				borderColor="success.600"
				_text={{ fontSize: "md", color: tips === 18 ? "white" : "success.600", fontWeight: "bold" }}
				m="2"
				onPress={() => setTips(18)}
			>
				18%
			</Button>
			<Button
				w={60}
				p="1"
				borderWidth={2}
				backgroundColor={tips === 20 ? "success.600" : "transparent"}
				borderColor="success.600"
				_text={{ fontSize: "md", color: tips === 20 ? "white" : "success.600", fontWeight: "bold" }}
				m="2"
				onPress={() => setTips(20)}
			>
				20%
			</Button>
			<Button
				w={60}
				p="1"
				borderWidth={2}
				backgroundColor={tips === 30 ? "success.600" : "transparent"}
				borderColor="success.600"
				_text={{ fontSize: "md", color: tips === 30 ? "white" : "success.600", fontWeight: "bold" }}
				m="2"
				onPress={() => setTips(30)}
			>
				30%
			</Button>
		</Flex>
	);
}

export default Tips;
