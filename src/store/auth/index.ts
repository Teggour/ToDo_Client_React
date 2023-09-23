import { create } from "zustand";
import { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUserMainInfo } from "../../api/services/auth.service";

interface State {
	isAuth: boolean;
	token: string | null;
	userMainInfo: IUserMainInfo | null;
}

interface Action {
	setIsAuth: (value: boolean) => void;
	setToken: (newToken: string) => void;
	setUserMainInfo: (user: IUserMainInfo) => void;
	setUserEmail: (email: IUserMainInfo["email"]) => void;
	clearState: () => void;
}

type AuthStore = State & Action;

const initialState: State = {
	isAuth: false,
	token: null,
	userMainInfo: null,
};

const store: StateCreator<AuthStore> = (set) => ({
	...initialState,
	setIsAuth: (auth) => set(() => ({ isAuth: auth })),
	setToken: (newToken) => set(() => ({ token: newToken })),
	setUserMainInfo: (user) => set(() => ({ userMainInfo: user })),
	setUserEmail: (email) =>
		set((store) => ({
			userMainInfo: store.userMainInfo
				? { ...store.userMainInfo, email: email }
				: null,
		})),
	clearState: () => set(() => initialState),
});

const useAuthStore = create<AuthStore>()(
	devtools(persist(store, { name: "todo-auth" }))
);

export { useAuthStore };
