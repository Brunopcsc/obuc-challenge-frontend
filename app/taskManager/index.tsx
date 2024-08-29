import { TaskDTO, TaskTableDTO } from "@/model/taskDTO";
import { convertToEnum, TaskStatusEnum } from "@/model/taskStatusEnum";
import { getTasks } from "@/services/task/task";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, Text, useTheme } from "react-native-paper";

export default function TaskManager({ navigation }: any) {
	const theme = useTheme();

	const [page, setPage] = React.useState<number>(0);
	const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
	const [itemsPerPage, onItemsPerPageChange] = React.useState(
		numberOfItemsPerPageList[0]
	);

	const [items, setItems] = React.useState<TaskTableDTO[]>([]);

	useEffect(() => {
		getTasks().then((response) => {
			const tasks: TaskDTO[] = response.data;

			const items: TaskTableDTO[] = tasks.map((task, id) => {
				return {
					key: id,
					description: task.description,
					user: task.user,
					status: task.status,
				};
			});

			setItems(items);
		});
	}, []);

	const from = page * itemsPerPage;
	const to = Math.min((page + 1) * itemsPerPage, items.length);

	React.useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);

	const addTask = () => {
		navigation.navigate("CreateTask");
	};

	return (
		<LinearGradient
			colors={[theme.colors.secondary, theme.colors.primary]}
			style={styles.container}>
			<View style={styles.screenContainer}>
				<Text style={styles.tableTitle}>Tarefas</Text>
				<DataTable style={styles.taskTable}>
					<DataTable.Header>
						<DataTable.Title textStyle={styles.tableLabels}>
							Descrição
						</DataTable.Title>
						<DataTable.Title textStyle={styles.tableLabels} numeric>
							Usuário
						</DataTable.Title>
						<DataTable.Title textStyle={styles.tableLabels} numeric>
							Status
						</DataTable.Title>
					</DataTable.Header>

					{items.slice(from, to).map((item) => (
						<DataTable.Row key={item.key}>
							<DataTable.Cell textStyle={styles.tableValues}>
								{item.description}
							</DataTable.Cell>
							<DataTable.Cell textStyle={styles.tableValues} numeric>
								{item.user?.name}
							</DataTable.Cell>
							<DataTable.Cell textStyle={styles.tableValues} numeric>
								{convertToEnum(item.status)}
							</DataTable.Cell>
						</DataTable.Row>
					))}

					<DataTable.Pagination
						page={page}
						numberOfPages={Math.ceil(items.length / itemsPerPage)}
						onPageChange={(page) => setPage(page)}
						label={`${from + 1}-${to} de ${items.length}`}
						numberOfItemsPerPageList={numberOfItemsPerPageList}
						numberOfItemsPerPage={itemsPerPage}
						onItemsPerPageChange={onItemsPerPageChange}
						showFastPaginationControls
						selectPageDropdownLabel={"Linhas por página"}
					/>
				</DataTable>
				<Button
					icon="plus"
					mode="contained"
					onPress={addTask}
					labelStyle={styles.tableLabels}
					buttonColor="#00FF7F"
					style={styles.button}>
					Adicionar tarefa
				</Button>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	screenContainer: {
		display: "flex",
		flexDirection: "column",
		padding: 24,
	},
	taskTable: {
		minWidth: 300,
		maxWidth: 900,
		backgroundColor: "rgba(211,211,211,0.7)",
		borderRadius: 20,
	},
	tableTitle: {
		alignSelf: "center",
		fontSize: 28,
		lineHeight: 30,
		fontWeight: 600,
		color: "rgba(54,54,54,0.95)",
		marginBottom: 12,
	},
	tableLabels: {
		fontSize: 22,
		lineHeight: 24,
		fontWeight: 600,
		color: "rgba(54,54,54,0.95)",
	},
	tableValues: {
		fontSize: 16,
		lineHeight: 18,
		fontWeight: 500,
		color: "rgba(54,54,54,0.95)",
	},
	button: {
		marginTop: 16,
		alignSelf: "flex-start",
	},
});
