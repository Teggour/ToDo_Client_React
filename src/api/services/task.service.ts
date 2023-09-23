import { AxiosResponse } from "axios";
import api from "../axios";
import { IResponse } from "./auth.service";

export enum Status {
	CREATED = "to do",
	IN_PROGRESS = "in progress",
	DONE = "done",
}

export interface ITask {
	id: number;
	title: string;
	description?: string;
	status: Status;
	estimatedTime: number | null;
	spentTime: number | null;
	createdAt: string;
	updatedAt: string;
}

export interface ITaskCreate extends Pick<ITask, "title" | "description"> {
	estimatedTime?: ITask["estimatedTime"];
}

export interface ITaskEdit
	extends Partial<Omit<ITask, "id" | "createdAt" | "updatedAt">> {}

class TaskService {
	private apiUrl = "task";

	async create(taskData: ITaskCreate) {
		return api.post<unknown, AxiosResponse<IResponse<ITask>>, ITaskCreate>(
			`${this.apiUrl}`,
			taskData
		);
	}

	async getAll() {
		return api.get<IResponse<ITask[]>>(`${this.apiUrl}/getAll`);
	}

	async getOneById(id: ITask["id"]) {
		return api.get<IResponse<ITask>>(`${this.apiUrl}/${id}`);
	}

	async updateById(id: ITask["id"], taskData: ITaskEdit) {
		return api.patch<unknown, AxiosResponse<IResponse<unknown>>, ITaskEdit>(
			`${this.apiUrl}/${id}`,
			taskData
		);
	}

	async deleteById(id: ITask["id"]) {
		return api.delete<unknown, AxiosResponse<IResponse<unknown>>>(
			`${this.apiUrl}/${id}`
		);
	}
}

const taskService = new TaskService();

export { taskService };
