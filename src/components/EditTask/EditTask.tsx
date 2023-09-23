import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import SubmitBtn from "../SubmitBtn";
import Input from "../Input";
import { ITask, ITaskEdit, Status } from "../../api/services/task.service";
import { useTaskOne } from "../../api/hooks/useTaskOne";
import { useTaskEdit } from "../../api/hooks/useTaskEdit";

interface IProps {}

const EditTask: FC<IProps> = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const textColor = useColorModeValue("gray.800", "gray.100");
	const labelColor = useColorModeValue("gray.800", "gray.100");
	const selectColor = useColorModeValue("gray.400", "gray.500");

	const btnBgColor = useColorModeValue("gray.600", "gray.400");
	const btnBgHoverColor = useColorModeValue("gray.700", "gray.300");
	const btnColor = useColorModeValue("gray.100", "gray.900");

	const { mutate } = useTaskEdit();
	const { data, isLoading, isError } = useTaskOne(Number(id));

	if (isLoading) return <>Loading...</>;

	if (isError) navigate("/404", { state: { redirectFrom: location } });

	const task = data?.data as ITask;

	const onSubmit = (data: { [key: string]: unknown }) => {
		mutate({
			id: Number(id),
			taskData: {
				...data,
				estimatedTime: Number(data?.estimatedTime),
				spentTime: Number(data?.spentTime),
			} as ITaskEdit,
		});
	};

	return (
		<Box pt={8}>
			<Text
				fontSize={{ base: "16px", lg: "18px" }}
				color={textColor}
				fontWeight={"500"}
				textTransform={"uppercase"}
				mb={"4"}
				align={"center"}
			>
				Edit task:
			</Text>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Title"
					name="title"
					defaultValue={task?.title}
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
					label="Description"
					name="description"
					value={task?.description}
					register={register}
					errors={errors}
					options={{
						required: false,
						maxLength: {
							value: 500,
							message: "Description max length is 500 symbols!",
						},
					}}
					mb={3}
				/>

				<FormControl
					isRequired={true}
					isInvalid={!!errors["status"]}
					mb={3}
				>
					<FormLabel mb="5px" ml="2px" color={labelColor}>
						Select status:
					</FormLabel>

					<Select
						{...register("status", { required: true })}
						isRequired={true}
						defaultValue={task?.status}
						borderColor={selectColor}
					>
						{Object.keys(Status).map((key) => (
							<option
								key={key}
								value={Status[key as keyof typeof Status]}
							>
								{key}
							</option>
						))}
					</Select>

					{errors["status"]?.type === "required" && (
						<FormErrorMessage>Field is required!</FormErrorMessage>
					)}
				</FormControl>

				<Input
					label="Estimated time (h)"
					name="estimatedTime"
					type={"number"}
					defaultValue={Number(task?.estimatedTime)}
					register={register}
					errors={errors}
					options={{
						required: false,
						min: 0,
						valueAsNumber: true,
					}}
					mb={3}
				/>

				<Input
					label="Spent time (h)"
					name="spentTime"
					type={"number"}
					defaultValue={Number(task?.spentTime)}
					register={register}
					errors={errors}
					options={{
						required: false,
						min: 0,
						valueAsNumber: true,
					}}
					mb={3}
				/>

				<SubmitBtn
					value={"Update"}
					isDisabled={isLoading}
					bgColor={btnBgColor}
					color={btnColor}
					fontWeight={"bold"}
					mt={5}
					_hover={{
						bg: btnBgHoverColor,
					}}
				/>
			</form>
		</Box>
	);
};

export default EditTask;
