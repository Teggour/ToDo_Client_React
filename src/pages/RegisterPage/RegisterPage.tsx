import { FC } from "react";
import { Flex, Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import Register from "../../components/Register";

interface IProps {}

const RegisterPage: FC<IProps> = () => {
	const boxShadowStyle = useColorModeValue(
		"0 3px 10px rgba(0, 0, 0, 0.2)",
		"0 3px 10px rgba(0, 0, 0, 0.9)"
	);

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={6}>
				<Stack align={"center"}>
					<Heading
						fontSize={"4xl"}
						textAlign={"center"}
						color={useColorModeValue("gray.900", "gray.50")}
					>
						Create new account:
					</Heading>
				</Stack>

				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={boxShadowStyle}
					p={8}
				>
					<Stack>
						<Register />
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default RegisterPage;
