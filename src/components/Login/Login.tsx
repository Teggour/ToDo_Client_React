import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Input from "../Input";
import SubmitBtn from "../SubmitBtn";
import { useAuthLogin } from "../../api/hooks/useAuthLogin";
import { ILogin } from "../../api/services/auth.service";

interface IProps {}

const LoginForm: FC<IProps> = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const { mutate, isLoading } = useAuthLogin();

	const onSubmit = (data: unknown) => {
		mutate(data as ILogin);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				options={{
					required: true,
					minLength: {
						value: 6,
						message: "Password min length is 6 symbols!",
					},
					maxLength: {
						value: 12,
						message: "Password max length is 12 symbols!",
					},
				}}
				mb={3}
			/>

			<SubmitBtn
				value={"Sign In"}
				isDisabled={isLoading} // TODO: check!
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
					Do not have account?&nbsp;
					<Link
						as={RouterLink}
						to={"/register"}
						color={useColorModeValue("gray.500", "gray.400")}
					>
						Register
					</Link>
				</Text>
			</Stack>
		</form>
	);
};

export default LoginForm;
