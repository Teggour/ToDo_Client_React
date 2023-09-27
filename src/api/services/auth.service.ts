import { AxiosResponse } from "axios";
import api from "../axios";
import { Role } from "../../components/Profile/Profile";

// TODO: refactoring
export interface IUserMainInfo {
	id: number;
	email: string;
	role: Role[];
}

export interface IUser extends IUserMainInfo {
	firstName: string;
	lastName: string;
	createdAt: string;
	updatedAt: string;
}

export interface IResponse<DataType> {
	statusCode: number;
	message: string;
	data: DataType;
}

export interface IResponseError {
	statusCode: number;
	message: string;
	error: string;
}

export interface ILoginData {
	user: IUserMainInfo;
	jwtToken: string;
}

export interface ILogin extends Pick<IUser, "email"> {
	password: string;
}

export interface IRegister
	extends Pick<IUser, "email" | "firstName" | "lastName"> {
	password: string;
}

class AuthService {
	private apiUrl = "auth";

	async login(loginData: ILogin) {
		return api.post<unknown, AxiosResponse<IResponse<ILoginData>>, ILogin>(
			`${this.apiUrl}/login`,
			loginData
		);
	}

	async register(registerData: IRegister) {
		return api.post<unknown, AxiosResponse<IResponse<IUser>>, IRegister>(
			`${this.apiUrl}/register`,
			registerData
		);
	}

	async getProfile() {
		return api.get<IResponse<IUser>>(`${this.apiUrl}/profile`);
	}
}

const authService = new AuthService();

export { authService };
