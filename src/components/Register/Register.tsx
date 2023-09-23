import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import SubmitBtn from "../SubmitBtn";
import { useAuthRegister } from "../../api/hooks/useAuthRegister";
import { IRegister } from "../../api/services/auth.service";

interface IProps {}

const RegisterForm: FC<IProps> = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const { mutate, isLoading } = useAuthRegister();

	const onSubmit = (data: unknown) => {
		mutate(data as IRegister);
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="First name"
				name="firstName"
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
				register={register}
				errors={errors}
				options={{ required: true }}
				mb={3}
			/>

			<Input
				label="Password"
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
				value={"Register"}
				isDisabled={isLoading}
				bgColor={useColorModeValue("gray.600", "gray.400")}
				color={useColorModeValue("gray.100", "gray.900")}
				fontWeight={"bold"}
				mt={5}
				_hover={{
					bg: useColorModeValue("gray.700", "gray.300"),
				}}
			/>

			<Stack pt={6}>
				<Text
					align={"center"}
					color={useColorModeValue("gray.700", "gray.200")}
				>
					Already a user?&nbsp;
					<Link
						as={RouterLink}
						to={"/login"}
						color={useColorModeValue("gray.500", "gray.400")}
					>
						Login
					</Link>
				</Text>
			</Stack>
		</form>
	);
};

export default RegisterForm;
