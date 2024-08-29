import { TaskStatusEnum } from "./taskStatusEnum";

export interface TaskDTO {
	description: string;
	user: UserDTO;
	status: TaskStatusEnum;
}

export interface TaskTableDTO {
	key: number;
	description: string;
	user: UserDTO;
	status: TaskStatusEnum;
}
