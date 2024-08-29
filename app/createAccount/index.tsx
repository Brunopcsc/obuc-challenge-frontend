import Input from "@/components/Input";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	View,
	StyleSheet,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import { register } from "@/services/register/register";

export default function CreateAccount({ navigation }: any) {
	const theme = useTheme();

	const [name, setName] = React.useState<string>("");
	const [username, setUsername] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [error, setError] = React.useState<string | null>();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		content: {
			padding: 24,
			display: "flex",
			flexDirection: "column",
			minHeight: "40%",
			maxWidth: 400,
			minWidth: 300,
			width: "60%",
			backgroundColor: theme.colors.secondary,
			borderRadius: 20,
			gap: 16,
		},
		loginLabel: {
			fontSize: 24,
			lineHeight: 26,
			alignSelf: "center",
		},
		loginButton: {
			fontSize: 18,
			lineHeight: 20,
			fontWeight: 500,
		},
		image: {
			width: 100,
			height: 100,
			marginBottom: 20,
			alignSelf: "center",
		},
		createAccountLabel: {
			color: "white",
			fontSize: 18,
			lineHeight: 20,
			fontWeight: 500,
			alignSelf: "center",
		},
		invalidCredentials: {
			color: "rgba(255,0,0,0.9)",
			fontSize: 18,
			lineHeight: 20,
			fontWeight: 600,
		},
	});

	const createUser = () => {
		const data: CreateUserDTO = {
			name: name,
			username: username,
			password: password,
		};

		register(data)
			.then(() => {
				navigation.navigate("Home");
			})
			.catch((error) => {
				const messageError: string = error.response.data.message[0];
				setError(messageError);
			});
	};

	return (
		<LinearGradient
			colors={[theme.colors.secondary, theme.colors.primary]}
			style={styles.container}>
			<View style={styles.content}>
				<Image
					source={require("../../assets/images/login.png")}
					style={styles.image}
				/>
				<Divider />
				<Input label="Nome" value={name} setValue={setName} />
				<Input label="Usuário" value={username} setValue={setUsername} />
				<Input label="Senha" value={password} setValue={setPassword} hideText />
				{error && <Text style={styles.invalidCredentials}>{error}</Text>}
				<Button
					mode="contained"
					onPress={createUser}
					labelStyle={styles.loginButton}
					buttonColor="#00FF7F"
					textColor="rgba(54,54,54,0.95)">
					Criar conta
				</Button>
			</View>
		</LinearGradient>
	);
}
