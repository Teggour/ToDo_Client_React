import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { ITaskCreate, taskService } from "../services/task.service";

const useTaskCreate = () => {
	const toast = useToast();
	const queryClient = useQueryClient();

	return useMutation(
		["task create"],
		(taskData: ITaskCreate) => taskService.create(taskData),
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
				toast({
					position: "top-right",
					title: res.message,
					status: "success",
					isClosable: true,
					containerStyle: { mt: 20 },
				});

				queryClient.invalidateQueries(["task all"]);
			},
		}
	);
};

export { useTaskCreate };
