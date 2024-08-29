import Input from "@/components/Input";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Provider, Text, useTheme } from "react-native-paper";
import { storeToken } from "@/services/storage/storage";
import { TaskStatusEnum } from "@/model/taskStatusEnum";
import { createTask } from "@/services/task/task";
import { getUsers } from "@/services/user/user";

export default function CreateTask({ navigation }: any) {
	const theme = useTheme();

	const [visible, setVisible] = useState(false);

	const [description, setDescription] = React.useState<string>("");
	const [user, setUser] = React.useState<UserDTO>();
	const [users, setUsers] = React.useState<UserDTO[]>();
	const [status, setStatus] = React.useState<TaskStatusEnum>();
	const [error, setError] = React.useState<string | null>();

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const handleUserSelect = (user: UserDTO) => {
		setUser(user);
		closeMenu();
	};

	React.useEffect(() => {
		getUsers().then((response) => {
			setUsers(response.data);
		});
	}, []);

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
		loginButton: {
			fontSize: 18,
			lineHeight: 20,
			fontWeight: 500,
		},
		errorMessage: {
			color: "rgba(255,0,0,0.9)",
			fontSize: 18,
			lineHeight: 20,
			fontWeight: 600,
		},
		dropdown: {
			marginVertical: 10,
			backgroundColor: "#D3D3D3",
			borderRadius: 20,
		},
		dropdownLabel: {
			color: "rgba(54,54,54,0.95)",
		},
		titleStyle: {
			alignSelf: "center",
			fontSize: 28,
			lineHeight: 30,
			fontWeight: 600,
			color: "rgba(54,54,54,0.95)",
			marginBottom: 12,
		},
		userStyle: {
			fontSize: 18,
			lineHeight: 20,
			fontWeight: 500,
			color: "rgba(54,54,54,0.95)",
		},
	});

	const addTask = () => {
		const data: CreateTaskDTO = {
			description: description,
			userId: user?.id,
		};

		createTask(data)
			.then((response) => {
				const token = response.data.acessToken;
				storeToken(token);
				navigation.navigate("TaskManager");
			})
			.catch((error) => {
				setError(error.response.data.message[0]);
			});
	};

	return (
		<Provider>
			<LinearGradient
				colors={[theme.colors.secondary, theme.colors.primary]}
				style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.titleStyle}>Nova Tarefa</Text>
					<Input
						label="Descrição"
						value={description}
						setValue={setDescription}
					/>
					<View>
						<Text style={styles.userStyle}>Usuário atribuído</Text>
						<View style={styles.dropdown}>
							<Menu
								visible={visible}
								onDismiss={closeMenu}
								anchor={
									<Button
										mode="outlined"
										onPress={openMenu}
										labelStyle={styles.dropdownLabel}>
										{user ? user.name : "Selecione um usuário"}
									</Button>
								}>
								{users?.map((user) => (
									<Menu.Item
										key={user.id}
										onPress={() => handleUserSelect(user)}
										title={user.name}
									/>
								))}
							</Menu>
						</View>
					</View>
					{error && <Text style={styles.errorMessage}>{error}</Text>}
					<Button
						mode="contained"
						onPress={addTask}
						labelStyle={styles.loginButton}
						buttonColor="#00FF7F"
						textColor="rgba(54,54,54,0.95)">
						Criar Tarefa
					</Button>
				</View>
			</LinearGradient>
		</Provider>
	);
}
