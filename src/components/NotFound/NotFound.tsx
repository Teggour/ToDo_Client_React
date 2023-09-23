import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Box,
	Heading,
	Text,
	Button,
	useColorModeValue,
	Link as LinkUI,
} from "@chakra-ui/react";
import { useAuthStore } from "../../store/auth";

interface IProps {}

const NotFound: FC<IProps> = () => {
	const isAuth = useAuthStore((store) => store.isAuth);
	const { state } = useLocation();

	return (
		<Box textAlign="center" py={36} px={6} h={"full"}>
			<Heading
				display="inline-block"
				as="h2"
				size="2xl"
				bgGradient={useColorModeValue(
					"linear(to-r, gray.600, gray.700)",
					"linear(to-r, gray.400, gray.200)"
				)}
				backgroundClip="text"
			>
				404
			</Heading>

			<Text
				color={useColorModeValue("gray.800", "gray.200")}
				fontSize="18px"
				mt={3}
				mb={2}
			>
				Page Not Found
			</Text>

			<Text color={useColorModeValue("gray.600", "gray.400")} mb={6}>
				The page you&apos;re looking for{" "}
				{state?.redirectFrom ? (
					<LinkUI
						as={Link}
						to={
							state?.redirectFrom.pathname +
							state?.redirectFrom.search
						}
					>
						({state?.redirectFrom.pathname}){" "}
					</LinkUI>
				) : (
					" "
				)}
				does not seem to exist
			</Text>

			<Button
				as={Link}
				to={isAuth ? "/tasks" : "/"}
				colorScheme="gray"
				bg={useColorModeValue("gray.700", "gray.400")}
				_hover={{ bg: useColorModeValue("gray.800", "gray.300") }}
				color={useColorModeValue("gray.100", "gray.900")}
				variant="solid"
			>
				Go to Home
			</Button>
		</Box>
	);
};

export default NotFound;
