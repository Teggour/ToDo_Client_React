import { AxiosResponse } from "axios";
import api from "../axios";
import { IRegister, IResponse, IUser } from "./auth.service";

export interface IUserEdit extends Partial<IRegister> {}

class UserService {
	private apiUrl = "user";

	async getMe() {
		return api.get<IResponse<IUser>>(`${this.apiUrl}/getMe`);
	}

	async updateById(id: IUser["id"], userData: IUserEdit) {
		return api.patch<unknown, AxiosResponse<IResponse<IUser>>, IUserEdit>(
			`${this.apiUrl}/update/${id}`,
			userData
		);
	}

	async deleteById(id: IUser["id"]) {
		return api.delete<unknown>(`${this.apiUrl}/delete/${id}`);
	}
}

const userService = new UserService();

export { userService };
