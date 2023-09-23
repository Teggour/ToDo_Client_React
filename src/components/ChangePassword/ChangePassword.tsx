import { FC } from "react";
import { useForm } from "react-hook-form";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Input from "../Input";
import SubmitBtn from "../SubmitBtn";
import { useUserEdit } from "../../api/hooks/useUserEdit";
import { IUserEdit } from "../../api/services/user.service";

interface IProps {}

const ChangePassword: FC<IProps> = () => {
	const { mutate, isLoading } = useUserEdit();

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const onSubmit = (data: unknown) => {
		mutate(data as IUserEdit);
	};

	const pwdOptions = {
		required: true,
		minLength: {
			value: 6,
			message: "Password min length is 6 symbols!",
		},
		maxLength: {
			value: 12,
			message: "Password max length is 12 symbols!",
		},
	};

	const confirmPwdOptions = {
		...pwdOptions,
		validate: (val: string) => {
			if (watch("password") != val) {
				return "Your passwords do no match!";
			}
		},
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
				Change password:
			</Text>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="New password"
					name="password"
					type="password"
					register={register}
					errors={errors}
					options={pwdOptions}
					mb={3}
				/>

				<Input
					label="Confirm password"
					name="confirmPassword"
					type="password"
					register={register}
					errors={errors}
					options={confirmPwdOptions}
					mb={3}
				/>

				<SubmitBtn
					value={"Change"}
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

export default ChangePassword;
