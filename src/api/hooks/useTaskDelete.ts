import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { ITask, taskService } from "../services/task.service";

const useTaskDelete = () => {
	const toast = useToast();
	const queryClient = useQueryClient();

	return useMutation(
		["task edit"],
		(id: ITask["id"]) => taskService.deleteById(id),
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

export default useTaskDelete;
