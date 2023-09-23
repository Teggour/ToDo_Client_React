import { FC } from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import Features from "../Features";

interface IProps {}

const Home: FC<IProps> = () => {
	return (
		<Container maxW={"3xl"} cursor={"default"}>
			<Stack as={Box} textAlign={"center"} spacing={12} py={12}>
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

				<Features />
			</Stack>
		</Container>
	);
};

export default Home;
