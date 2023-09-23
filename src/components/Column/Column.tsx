import { FC, Fragment, useState } from "react";
import {
	Button,
	Flex,
	Text,
	Tooltip,
	useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Task from "../Task/Task";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import StrictModeDroppable from "../StrictModeDroppable";
import { ITask, Status } from "../../api/services/task.service";

interface IProps {
	columnTitle: Status;
	tasks: ITask[];
	withAddBtn?: boolean;
}

const Column: FC<IProps> = ({ columnTitle, tasks, withAddBtn = false }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

	const btnBg = useColorModeValue("gray.300", "gray.700");
	const scrollbarBg = useColorModeValue("gray.400", "gray.700");
	const scrollbarThumbBg = useColorModeValue("gray.500", "gray.600");

	const onMouseEnter = (): void => setIsTooltipOpen(true);
	const onMouseLeave = (): void => setIsTooltipOpen(false);

	const onModalClose = (): void => setIsModalOpen(false);
	const onModalOpen = (): void => setIsModalOpen(true);

	return (
		<Flex
			w={"400px"}
			h={"560px"}
			flexDir={"column"}
			gap={3}
			bg={useColorModeValue("gray.300", "gray.800")}
			rounded={5}
		>
			<Flex
				align={"center"}
				h={"60px"}
				bg={useColorModeValue("gray.400", "gray.600")}
				rounded={5}
				px={2}
			>
				<Text
					fontSize={25}
					fontWeight={700}
					color={useColorModeValue("gray.900", "gray.100")}
					textTransform={"uppercase"}
					m={"0 auto"}
					cursor={"default"}
				>
					{columnTitle}
				</Text>

				{withAddBtn && (
					<Tooltip
						label="Create new task"
						placement={"top-start"}
						isOpen={isTooltipOpen}
					>
						<Button
							variant={"ghost"}
							onClick={onModalOpen}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							_hover={{
								bg: btnBg,
							}}
						>
							<AddIcon />
						</Button>
					</Tooltip>
				)}
			</Flex>

			<StrictModeDroppable droppableId={columnTitle}>
				{(droppableProvided) => (
					<Flex
						px={2}
						flex={1}
						flexDir={"column"}
						overflowY={"auto"}
						sx={{
							"&::-webkit-scrollbar": {
								width: 4,
								borderRadius: "8px",
								backgroundColor: scrollbarBg,
							},
							"&::-webkit-scrollbar-thumb": {
								backgroundColor: scrollbarThumbBg,
								borderRadius: "8px",
							},
						}}
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
					>
						<Fragment>
							{droppableProvided.placeholder}

							{tasks.map((task, idx) => (
								<Task key={task.id} task={task} idx={idx} />
							))}
						</Fragment>
					</Flex>
				)}
			</StrictModeDroppable>

			<CreateTaskModal isOpen={isModalOpen} onClose={onModalClose} />
		</Flex>
	);
};

export default Column;
