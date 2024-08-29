import Input from "@/components/Input";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import { Button as ReactButton } from "react-native";
import { login } from "@/services/login/login";
import { storeToken } from "@/services/storage/storage";

export default function Home({ navigation }: any) {
	const theme = useTheme();

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
			minHeight: "50%",
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

	const signIn = () => {
		const data: LoginDTO = {
			username: username,
			password: password,
		};

		login(data)
			.then((response) => {
				const token = response.data.acessToken;
				storeToken(token);
				setError(null);
				navigation.navigate("TaskManager");
			})
			.catch(() => {
				setError("Usuário ou senha inválidos!");
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
				<Input label="Usuário" value={username} setValue={setUsername} />
				<Input label="Senha" value={password} setValue={setPassword} hideText />
				{error && <Text style={styles.invalidCredentials}>{error}</Text>}
				<Button
					mode="contained"
					onPress={signIn}
					labelStyle={styles.loginButton}
					buttonColor="#00FF7F"
					textColor="rgba(54,54,54,0.95)">
					Entrar
				</Button>
				<ReactButton
					title="Criar conta"
					color="transparent"
					onPress={() => navigation.navigate("CreateAccount")}
				/>
			</View>
		</LinearGradient>
	);
}
