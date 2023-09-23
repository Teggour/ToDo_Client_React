import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Column";
import { ITask, Status } from "../../api/services/task.service";
import { useTaskAll } from "../../api/hooks/useTaskAll";
import { useTaskEdit } from "../../api/hooks/useTaskEdit";

interface IProps {}

const TaskBoard: FC<IProps> = () => {
	const { data, isLoading } = useTaskAll();
	const { mutate } = useTaskEdit(false);

	// TODO: create a skeleton
	if (isLoading) return <>Loading...</>;

	const tasks = data?.data as ITask[];

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

			changeStatusById(+draggableId, destination.droppableId as Status);
		}
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
							/>
						);
					})}
				</Flex>
			</Flex>
		</DragDropContext>
	);
};

export default TaskBoard;
