import { FC } from "react";
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import MainContainer from "../MainContainer";

interface IProps {}

const Footer: FC<IProps> = () => {
	return (
		<Box
			bg={useColorModeValue("gray.300", "gray.700")}
			color={useColorModeValue("gray.700", "gray.100")}
		>
			<MainContainer>
				<Stack
					py={4}
					direction={"row"}
					justify={"center"}
					align={"center"}
				>
					<Text cursor={"default"}>
						©2022 Created by Malik Teggour
					</Text>
				</Stack>
			</MainContainer>
		</Box>
	);
};

export default Footer;
