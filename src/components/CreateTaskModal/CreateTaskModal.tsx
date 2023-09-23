import { FC } from "react";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import SubmitBtn from "../SubmitBtn";
import { useTaskCreate } from "../../api/hooks/useTaskCreate";
import { ITaskCreate } from "../../api/services/task.service";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

const CreateTaskModal: FC<IProps> = ({ isOpen, onClose }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const { mutate } = useTaskCreate();

	const onSubmit = (data: { [key: string]: unknown }) => {
		mutate({
			...data,
			estimatedTime: Number(data?.estimatedTime),
		} as ITaskCreate);

		reset();

		onClose();
	};

	return (
		<Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />

			<ModalContent>
				<ModalHeader>Create new task</ModalHeader>

				<ModalCloseButton />

				<ModalBody pb={6}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							label={"Title"}
							name={"title"}
							register={register}
							errors={errors}
							options={{
								required: true,
								maxLength: {
									value: 50,
									message: "Title max length is 50 symbols!",
								},
							}}
							mb={3}
						/>

						<Input
							label={"Description"}
							name={"description"}
							register={register}
							errors={errors}
							options={{
								required: false,
								maxLength: {
									value: 500,
									message:
										"Description max length is 500 symbols!",
								},
							}}
							mb={3}
						/>

						<Input
							label={"Estimated time (h)"}
							name={"estimatedTime"}
							type={"number"}
							register={register}
							errors={errors}
							options={{
								required: false,
								min: 0,
							}}
							mb={3}
						/>

						<SubmitBtn
							value={"Create"}
							bgColor={useColorModeValue("gray.600", "gray.400")}
							color={useColorModeValue("gray.100", "gray.900")}
							fontWeight={"bold"}
							mt={5}
							_hover={{
								bg: useColorModeValue("gray.700", "gray.300"),
							}}
						/>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CreateTaskModal;
