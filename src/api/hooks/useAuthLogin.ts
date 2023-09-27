import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ILogin, IResponseError, authService } from "../services/auth.service";
import { useAuthStore } from "../../store/auth";

const useAuthLogin = () => {
	const toast = useToast();
	const navigate = useNavigate();

	const setIsAuth = useAuthStore((store) => store.setIsAuth);
	const setToken = useAuthStore((store) => store.setToken);
	const setUserMainInfo = useAuthStore((store) => store.setUserMainInfo);

	return useMutation(
		["auth login"],
		(loginData: ILogin) => authService.login(loginData),
		{
			onError: (error: AxiosError<IResponseError>) => {
				console.log({ error });

				toast({
					position: "top-right",
					title: "Error!",
					description: error.response
						? error.response.data.message
						: error.message,
					status: "error",
					isClosable: true,
					containerStyle: { mt: 20 },
				});
			},
			onSuccess: ({ data: res }) => {
				setIsAuth(true);
				setToken(res.data.jwtToken);
				setUserMainInfo(res.data.user);

				toast({
					position: "top-right",
					title: `Hello!`,
					description: res.message,
					status: "success",
					isClosable: true,
					containerStyle: { mt: 20 },
				});

				navigate("/tasks");
			},
		}
	);
};

export { useAuthLogin };
