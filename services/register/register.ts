import { HttpMethod } from "@/model/method";
import fetchData from "../api/api";

export const register = (payload: CreateUserDTO) => {
	return fetchData("register", HttpMethod.POST, payload);
};
