import { HttpMethod } from "@/model/method";
import fetchData from "../api/api";

export const login = (payload: LoginDTO) => {
	return fetchData("login", HttpMethod.POST, payload);
};
