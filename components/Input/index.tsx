import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface InputProps {
	label: string;
	value: string;
	setValue: any;
	hideText?: boolean;
}

const customTheme = {
	colors: {
		primary: "black",
	},
};

export default function Input({
	label,
	value,
	setValue,
	hideText,
}: InputProps) {
	const styles = StyleSheet.create({
		container: {
			flexDirection: "column",
		},
		textInput: { backgroundColor: "#D3D3D3", fontSize: 20 },
	});

	return (
		<View style={styles.container}>
			<TextInput
				label={label}
				value={value}
				onChangeText={(value) => setValue(value)}
				mode="flat"
				style={styles.textInput}
				textColor="rgba(54,54,54,0.95)"
				theme={customTheme}
				secureTextEntry={hideText}
			/>
		</View>
	);
}
