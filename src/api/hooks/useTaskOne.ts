import { useQuery } from "@tanstack/react-query";
import { ITask, taskService } from "../services/task.service";

const useTaskOne = (id: ITask["id"]) => {
	return useQuery(["task one", id], () => taskService.getOneById(id), {
		select: ({ data }) => data,
		// enabled: !!id,
	});
};

export { useTaskOne };
