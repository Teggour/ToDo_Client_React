import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ITask, ITaskEdit, taskService } from "../services/task.service";

interface IProps {
	id: ITask["id"];
	taskData: ITaskEdit;
}

const useTaskEdit = (showSuccessMessage: boolean | undefined = true) => {
	const toast = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(
		["task edit"],
		({ id, taskData }: IProps) => taskService.updateById(id, taskData),
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
				showSuccessMessage &&
					toast({
						position: "top-right",
						title: res.message,
						status: "success",
						isClosable: true,
						containerStyle: { mt: 20 },
					});

				queryClient.invalidateQueries(["task all"]);

				navigate("/tasks");
			},
		}
	);
};

export { useTaskEdit };
