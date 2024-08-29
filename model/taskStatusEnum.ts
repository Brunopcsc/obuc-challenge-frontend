export enum TaskStatusEnum {
	NOT_STARTED = "Não iniciada",
	IN_PROGRESS = "Em progresso",
	DONE = "Concluída",
}

export const convertToEnum = (value: string): TaskStatusEnum => {
	switch (value) {
		case "NOT_STARTED":
			return TaskStatusEnum.NOT_STARTED;
		case "IN_PROGRESS":
			return TaskStatusEnum.IN_PROGRESS;
		default:
			return TaskStatusEnum.DONE;
	}
};
