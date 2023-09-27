import { FC } from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	Stack,
	useColorModeValue,
	Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import Features from "../Features";

interface IProps {}

const Home: FC<IProps> = () => {
	const isAuth = useAuthStore((store) => store.isAuth);

	return (
		<Container maxW={"3xl"} cursor={"default"}>
			<Stack as={Box} textAlign={"center"} spacing={12} py={10}>
				<Heading
					fontWeight={700}
					fontSize={58}
					lineHeight={"120%"}
					color={useColorModeValue("gray.800", "gray.100")}
				>
					Kanban To-Do Board
				</Heading>

				<Text color={useColorModeValue("gray.600", "gray.300")}>
					A Kanban To-Do Board is a visual task management tool that
					helps individuals organize, prioritize, and track their
					tasks in a highly visual and intuitive manner. It's inspired
					by the Kanban system, which originated in Japanese
					manufacturing but has since been adopted for various
					purposes, including project management and personal task
					tracking.
				</Text>

				<Button
					as={Link}
					to={isAuth ? "/tasks" : "/login"}
					colorScheme="gray"
					w={"150px"}
					m={"0 auto"}
					bg={useColorModeValue("gray.700", "gray.400")}
					_hover={{ bg: useColorModeValue("gray.800", "gray.300") }}
					color={useColorModeValue("gray.100", "gray.900")}
					variant="solid"
				>
					Get started
				</Button>

				<Features />
			</Stack>
		</Container>
	);
};

export default Home;
