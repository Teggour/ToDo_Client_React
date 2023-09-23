import { FC } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import useTaskDelete from "../../api/hooks/useTaskDelete";
import { ITask } from "../../api/services/task.service";

interface IProps {
	task: ITask;
	isOpen: boolean;
	onClose: () => void;
}

const TaskModal: FC<IProps> = ({ task, isOpen, onClose }) => {
	const { mutate } = useTaskDelete();

	const updatedAt = new Date(task.updatedAt).toLocaleDateString();
	const createdAt = new Date(task.createdAt).toLocaleDateString();

	const fontSize: string = "16px";

	const spanStyle: { fontWeight: string; textDecoration: string } = {
		fontWeight: "bold",
		textDecoration: "underline",
	};

	const handleDelete = () => {
		mutate(task.id);

		onClose();
	};

	return (
		<Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />

			<ModalContent
				cursor={"default"}
				color={useColorModeValue("gray.900", "gray.200")}
			>
				<ModalHeader pr={10} pl={4} pt={2}>
					<Text fontSize={24}>
						<span style={spanStyle}>#{task.id}:</span>
						&nbsp;
						{task.title}
					</Text>
				</ModalHeader>

				<ModalCloseButton />

				<ModalBody pb={4}>
					<Text fontSize={fontSize}>
						<span style={spanStyle}>Description:</span>
						&nbsp;{task.description}
					</Text>

					<Text fontSize={fontSize}>
						<span style={spanStyle}>Estimated time (h):</span>
						&nbsp;{task.estimatedTime}
					</Text>

					<Text fontSize={fontSize}>
						<span style={spanStyle}>Spent time (h):</span>
						&nbsp;{task.spentTime}
					</Text>

					<Text fontSize={fontSize}>
						<span style={spanStyle}>Created:</span>
						&nbsp;{createdAt}
					</Text>

					<Text fontSize={fontSize}>
						<span style={spanStyle}>Last update:</span>
						&nbsp;{updatedAt}
					</Text>
				</ModalBody>

				<ModalFooter>
					<Button onClick={handleDelete} colorScheme="red" mr={3}>
						Delete
					</Button>

					<Button
						as={Link}
						to={`/task/${task.id}/edit`}
						colorScheme="green"
					>
						Edit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default TaskModal;
