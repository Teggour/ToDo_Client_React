import { FC } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import SubmitBtn from "../SubmitBtn";
import Input from "../Input";
import { IUser } from "../../api/services/auth.service";
import { useAuthProfile } from "../../api/hooks/useAuthProfile";
import { useUserEdit } from "../../api/hooks/useUserEdit";
import { IUserEdit } from "../../api/services/user.service";

interface IProps {}

const EditProfile: FC<IProps> = () => {
	const { data } = useAuthProfile();
	const { mutate, isLoading } = useUserEdit();

	const user = data?.data as IUser;

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data: unknown) => {
		mutate(data as IUserEdit);
	};

	return (
		<Box pt={8}>
			<Text
				fontSize={{ base: "16px", lg: "18px" }}
				color={useColorModeValue("gray.800", "gray.100")}
				fontWeight={"500"}
				textTransform={"uppercase"}
				mb={"4"}
				align={"center"}
			>
				Edit profile:
			</Text>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="First name"
					name="firstName"
					defaultValue={user?.firstName}
					register={register}
					errors={errors}
					options={{
						required: true,
						maxLength: {
							value: 25,
							message: "First name max length is 25 symbols!",
						},
					}}
					mb={3}
				/>

				<Input
					label="Last name"
					name="lastName"
					defaultValue={user?.lastName}
					register={register}
					errors={errors}
					options={{
						required: true,
						maxLength: {
							value: 25,
							message: "Last name max length is 25 symbols!",
						},
					}}
					mb={3}
				/>

				<Input
					label="Email"
					name="email"
					type="email"
					defaultValue={user?.email}
					register={register}
					errors={errors}
					options={{ required: true }}
					mb={3}
				/>

				<SubmitBtn
					value={"Edit"}
					isDisabled={isLoading}
					bgColor={useColorModeValue("gray.600", "gray.400")}
					color={useColorModeValue("gray.100", "gray.900")}
					fontWeight={"bold"}
					mt={5}
					_hover={{
						bg: useColorModeValue("gray.700", "gray.300"),
					}}
				/>
			</form>
		</Box>
	);
};

export default EditProfile;
