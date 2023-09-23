import { FC, useState } from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Draggable, DraggableProps } from "react-beautiful-dnd";
import TaskModal from "../TaskModal/TaskModal";
import { ITask } from "../../api/services/task.service";

interface IProps {
	task: ITask;
	idx: DraggableProps["index"];
}

const Task: FC<IProps> = ({ task, idx }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const onModalClose = (): void => setIsModalOpen(false);
	const onModalOpen = (): void => setIsModalOpen(true);

	const color = useColorModeValue("gray.800", "gray.200");
	const bgColor = useColorModeValue("gray.100", "gray.700");
	const hoverBg = useColorModeValue("gray.50", "gray.600");
	const outlineColor = useColorModeValue("gray.300", "gray.600");

	return (
		<Draggable draggableId={String(task.id)} index={idx}>
			{(draggableProvided, draggableSnapshot) => (
				<Flex
					onClick={onModalOpen}
					mb={5}
					minH={"115px"}
					bg={draggableSnapshot.isDragging ? hoverBg : bgColor}
					rounded={8}
					direction={"column"}
					justify={"space-between"}
					p={3}
					outline={"2px solid"}
					outlineColor={
						draggableSnapshot.isDragging
							? outlineColor
							: "transparent"
					}
					boxShadow={
						draggableSnapshot.isDragging
							? "0 5px 10px rgba(0, 0, 0, 0.6)"
							: "unset"
					}
					_hover={{ bg: hoverBg }}
					ref={draggableProvided.innerRef}
					{...draggableProvided.draggableProps}
					{...draggableProvided.dragHandleProps}
				>
					<Text fontSize={"18px"} fontWeight={500}>
						{task.title}
					</Text>

					<Flex
						direction={"row"}
						justify={"space-around"}
						color={color}
					>
						<Flex
							direction={"row"}
							align={"center"}
							fontSize={"14px"}
							fontWeight={"bold"}
						>
							<Text>Estimated:</Text>
							&nbsp;{task.estimatedTime}
						</Flex>

						<Flex
							direction={"row"}
							align={"center"}
							fontSize={"14px"}
							fontWeight={"bold"}
						>
							<Text>Spent:</Text>
							&nbsp;{task.spentTime ?? 0}
						</Flex>
					</Flex>

					<TaskModal
						task={task}
						isOpen={isModalOpen}
						onClose={onModalClose}
					/>
				</Flex>
			)}
		</Draggable>
	);
};

export default Task;
