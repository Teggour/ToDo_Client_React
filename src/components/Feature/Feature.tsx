import { FC, ReactElement } from "react";
import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";

interface IProps {
	title: string;
	text: string;
	icon: ReactElement;
}

const Feature: FC<IProps> = ({ title, text, icon }) => {
	return (
		<Stack>
			<Flex direction={"column"} align={"center"} justify={"center"}>
				<Flex
					w={10}
					h={10}
					align={"center"}
					justify={"center"}
					rounded={"full"}
					bg={"gray.600"}
					mb={3}
				>
					{icon}
				</Flex>

				<Text fontWeight={600} mb={1}>
					{title}
				</Text>

				<Text color={useColorModeValue("gray.700", "gray.300")}>
					{text}
				</Text>
			</Flex>
		</Stack>
	);
};

export default Feature;
