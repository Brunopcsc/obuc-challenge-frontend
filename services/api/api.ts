import { HttpMethod } from "@/model/method";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "../storage/storage";

const api = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		"Content-Type": "application/json",
	},
});

const fetchData = async (
	endpoint: string,
	method: HttpMethod,
	data?: any,
	headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<any>> => {
	try {
		const token = await getToken();

		const config: AxiosRequestConfig = {
			url: endpoint,
			method,
			data,
			headers: {
				...headers,
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		};

		const response = await api.request(config);
		return response;
	} catch (error) {
		console.error("Error in fetchData:", error);
		throw error;
	}
};

export default fetchData;
