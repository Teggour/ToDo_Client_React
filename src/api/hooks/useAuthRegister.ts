import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
	IRegister,
	IResponseError,
	authService,
} from "../services/auth.service";

const useAuthRegister = () => {
	const toast = useToast();
	const navigate = useNavigate();

	return useMutation(
		["auth register"],
		(registerData: IRegister) => authService.register(registerData),
		{
			onError: (error: AxiosError<IResponseError>) => {
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
				toast({
					position: "top-right",
					title: res.message,
					status: "success",
					isClosable: true,
					containerStyle: { mt: 20 },
				});

				navigate("/login");
			},
		}
	);
};

export { useAuthRegister };
