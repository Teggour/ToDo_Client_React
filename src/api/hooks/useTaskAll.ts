import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/task.service";

const useTaskAll = () => {
	return useQuery(["task all"], () => taskService.getAll(), {
		select: ({ data }) => data,
	});
};

export { useTaskAll };
