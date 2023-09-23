import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import Header from "../Header";
import Footer from "../Footer";
import MainContainer from "../MainContainer";

interface IProps {}

const PageTemplate: FC<IProps> = () => {
	return (
		<Flex
			minH={"100vh"}
			direction={"column"}
			bg={useColorModeValue("gray.50", "gray.900")}
		>
			<Header />

			<MainContainer p={4} h={"full"} mb={"auto"}>
				<Outlet />
			</MainContainer>

			<Footer />
		</Flex>
	);
};

export default PageTemplate;
