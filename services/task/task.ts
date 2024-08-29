import { HttpMethod } from "@/model/method";
import fetchData from "../api/api";

export const getTasks = () => {
	return fetchData("tasks", HttpMethod.GET);
};

export const createTask = (payload: CreateTaskDTO) => {
	return fetchData("tasks", HttpMethod.POST, payload);
};
