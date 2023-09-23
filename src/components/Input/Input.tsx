import { FC, ComponentProps, useState } from "react";
import {
	Input as InputChakraUI,
	FormControl,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	InputRightElement,
	Button,
	useColorModeValue,
	InputProps,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	FieldErrors,
	FieldValues,
	GlobalError,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";

interface IProps extends InputProps {
	name: string;
	label: string;
	errors: FieldErrors<FieldValues>;
	register: UseFormRegister<FieldValues>;
	type?: ComponentProps<typeof InputChakraUI>["type"];
	defaultValue?: string | number;
	options?: RegisterOptions<FieldValues, string>;
}

const Input: FC<IProps> = ({
	type,
	label,
	register,
	name,
	options,
	errors,
	defaultValue,
	...props
}) => {
	const [show, setShow] = useState<boolean>(false);

	const borderColor = useColorModeValue("gray.400", "gray.500");

	const isInvalid = !!errors[name];
	const isRequired = !!options?.required; // TODO: check

	const isPasswordType = type === "password";
	const inputType = isPasswordType ? (show ? "text" : "password") : type;

	const errorMessage =
		errors[name]?.type === "required"
			? "Field is required!"
			: errors[name]
			? (errors[name] as GlobalError).message
			: "";

	const handleClick = (): void => setShow(!show);

	const input = (
		<InputChakraUI
			{...register(name, options)}
			defaultValue={defaultValue}
			// isInvalid={errors[name] ? true : false}
			type={inputType}
			placeholder={`Enter ${label.toLowerCase()}`}
			borderColor={borderColor}
		/>
	);

	return (
		<FormControl {...props} isInvalid={isInvalid} isRequired={isRequired}>
			<FormLabel
				mb="5px"
				ml="2px"
				color={useColorModeValue("gray.800", "gray.100")}
			>
				{label}:
			</FormLabel>

			{isPasswordType ? (
				<InputGroup>
					{input}
					<InputRightElement h={"full"}>
						<Button variant={"ghost"} onClick={handleClick}>
							{show ? <ViewIcon /> : <ViewOffIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
			) : (
				<>{input}</>
			)}

			{errorMessage && (
				<FormErrorMessage>{errorMessage}</FormErrorMessage>
			)}
		</FormControl>
	);
};

export default Input;
