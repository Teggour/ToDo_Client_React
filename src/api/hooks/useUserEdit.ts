import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IUserEdit, userService } from "../services/user.service";
import { useAuthStore } from "../../store/auth";

const useUserEdit = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const id = useAuthStore((store) => store.userMainInfo?.id as number);
	const setUserEmail = useAuthStore((store) => store.setUserEmail);

	return useMutation(
		["user edit"],
		(userData: IUserEdit) => userService.updateById(id, userData),
		{
			onError: (err: Error) => {
				toast({
					position: "top-right",
					title: "Error!",
					description: err.message,
					status: "error",
					isClosable: true,
					containerStyle: { mt: 20 },
				});
			},
			onSuccess: ({ data: res }) => {
				setUserEmail(res.data.email);

				toast({
					position: "top-right",
					title: res.message,
					status: "success",
					isClosable: true,
					containerStyle: { mt: 20 },
				});

				navigate("/profile");
			},
		}
	);
};

export { useUserEdit };
