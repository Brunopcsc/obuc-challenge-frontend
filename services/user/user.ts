import { HttpMethod } from "@/model/method";
import fetchData from "../api/api";

export const getUsers = () => {
	return fetchData("users", HttpMethod.GET);
};
