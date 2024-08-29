import * as React from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home";
import CreateAccount from "./createAccount";
import TaskManager from "./taskManager";
import CreateTask from "./createTask";

const Stack = createNativeStackNavigator();

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "rgba(184, 231, 255, 0.95)",
		secondary: "rgba(44, 138, 240, 0.95)",
	},
};

export default function Main() {
	return (
		<NavigationContainer independent={true}>
			<PaperProvider theme={theme}>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ title: "Entrar" }}
					/>
					<Stack.Screen
						name="CreateAccount"
						component={CreateAccount}
						options={{ title: "Criar Conta" }}
					/>
					<Stack.Screen
						name="TaskManager"
						component={TaskManager}
						options={{ title: "Gerenciar Tarefas" }}
					/>
					<Stack.Screen
						name="CreateTask"
						component={CreateTask}
						options={{ title: "Criar tarefa" }}
					/>
				</Stack.Navigator>
			</PaperProvider>
		</NavigationContainer>
	);
}
