import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5 * 1000,
	headers: { "Content-type": "application/json" },
});

api.interceptors.request.use((instance) => {
	const {
		state: { token },
	} = JSON.parse(String(localStorage.getItem("todo-auth")));

	if (token) {
		instance.headers["Authorization"] = `Bearer ${token}`;
	}

	return instance;
});

export default api;
