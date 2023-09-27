import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useQueryClient } from "@tanstack/react-query";
import Column from "../Column";
import { ITask, Status } from "../../api/services/task.service";
import { useTaskAll } from "../../api/hooks/useTaskAll";
import { useTaskEdit } from "../../api/hooks/useTaskEdit";

interface IProps {}

interface IObj {
	[key: string]: unknown;
}

interface IQueryCache extends IObj {
	data: { data?: ITask[]; statusCode?: number; message?: string };
}

const TaskBoard: FC<IProps> = () => {
	const { data, isLoading } = useTaskAll();
	const { mutate } = useTaskEdit(false);

	const queryClient = useQueryClient();

	const tasks = (data?.data || []) as ITask[];

	const sortedTasks = tasks.sort((a, b) => {
		const aDate = new Date(a.updatedAt);
		const bDate = new Date(b.updatedAt);

		return bDate.getTime() - aDate.getTime();
	});

	const getByStatus = (status: Status): ITask[] =>
		sortedTasks.filter((task) => task.status === status);

	const changeStatusById = (taskId: ITask["id"], newStatus: Status) => {
		mutate({ id: taskId, taskData: { status: newStatus } });
	};

	const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
		if (destination) {
			if (source.droppableId === destination.droppableId) return;

			queryClient.setQueryData<IQueryCache>(
				["task all"],
				(previousTasks) => {
					return {
						...previousTasks,
						data: {
							...previousTasks?.data,
							data: previousTasks?.data?.data?.map((task) =>
								task.id === +draggableId
									? {
											...task,
											status: destination.droppableId as Status,
											updatedAt: new Date(
												Date.now()
											).toISOString(),
									  }
									: task
							),
						},
					};
				}
			);

			changeStatusById(+draggableId, destination.droppableId as Status);
		}
	};

	const skeletonsCount = {
		[Status.CREATED]: 3,
		[Status.IN_PROGRESS]: 1,
		[Status.DONE]: 2,
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Flex direction={"column"} minH={"550px"} w={"full"}>
				<Flex justify={"space-between"} gap={3}>
					{Object.keys(Status).map((key, idx) => {
						const statusKey = key as keyof typeof Status;
						return (
							<Column
								key={idx}
								columnTitle={Status[statusKey]}
								tasks={getByStatus(Status[statusKey])}
								withAddBtn={
									Status[statusKey] === Status.CREATED
								}
								isTasksLoading={isLoading}
								skeletonsCount={
									skeletonsCount[Status[statusKey]]
								}
							/>
						);
					})}
				</Flex>
			</Flex>
		</DragDropContext>
	);
};

export default TaskBoard;
