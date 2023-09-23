import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Box,
	Flex,
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useColorModeValue,
	Stack,
	useColorMode,
	Image,
	MenuDivider,
	Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import MainContainer from "../MainContainer";
import { useAuthStore } from "../../store/auth";

interface IProps {}

const Header: FC<IProps> = () => {
	const clearAuthState = useAuthStore((store) => store.clearState);

	const navigate = useNavigate();

	const { colorMode, toggleColorMode } = useColorMode();

	const isAuth = useAuthStore((store) => store.isAuth);
	const fullname = "Test User";

	const filter = useColorModeValue("none", "invert(1)");
	const bgMain = useColorModeValue("gray.200", "gray.700");
	const colorMain = useColorModeValue("gray.800", "gray.50");

	const bgColor = useColorModeValue("gray.700", "gray.300");
	const bgHoverColor = useColorModeValue("gray.800", "gray.200");
	const textColor = useColorModeValue("gray.50", "gray.900");

	const handleLogout = () => {
		clearAuthState();

		navigate("/");
	};

	return (
		<Box bg={bgMain} px={4}>
			<MainContainer>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<Flex
						alignItems={"center"}
						justifyContent={"space-between"}
						cursor={"pointer"}
						as={Link}
						to={isAuth ? "/tasks" : "/"}
					>
						<Image
							filter={filter}
							maxH={8}
							pr={2}
							src="/kanban-logo.svg"
						/>

						<Box color={colorMain} fontWeight={900} fontSize={24}>
							ToDo
						</Box>
					</Flex>

					<Flex alignItems={"center"}>
						<Stack direction={"row"} spacing={7}>
							<Button
								onClick={toggleColorMode}
								variant={"ghost"}
								_hover={{ variant: "ghost" }}
								_active={{ variant: "ghost" }}
							>
								{colorMode === "light" ? (
									<MoonIcon color={colorMain} />
								) : (
									<SunIcon color={colorMain} />
								)}
							</Button>

							{isAuth ? (
								<Menu autoSelect={false}>
									<MenuButton
										as={Button}
										rounded={"full"}
										variant={"link"}
										cursor={"pointer"}
										minW={0}
									>
										<Avatar
											name={fullname}
											getInitials={(name) => name[0]}
											size={"sm"}
											bg={"gray.500"}
										/>
									</MenuButton>

									<MenuList mt={1}>
										<MenuItem as={Link} to={"/profile"}>
											<Text m={"auto"}>Profile</Text>
										</MenuItem>

										<MenuDivider />

										<MenuItem
											as={Link}
											to={"/profile/edit"}
										>
											<Text m={"auto"}>Edit profile</Text>
										</MenuItem>

										<MenuDivider />

										<MenuItem
											as={Link}
											to={"/profile/change-password"}
										>
											<Text m={"auto"}>
												Change password
											</Text>
										</MenuItem>

										<MenuDivider />

										<MenuItem onClick={handleLogout}>
											<Text m={"auto"}>Logout</Text>
										</MenuItem>
									</MenuList>
								</Menu>
							) : (
								<Stack
									flex={{ base: 1, md: 0 }}
									justify={"flex-end"}
									direction={"row"}
									spacing={6}
								>
									<Button
										as={Link}
										to={"/register"}
										display={{
											base: "none",
											md: "inline-flex",
										}}
										fontSize={"sm"}
										fontWeight={600}
										variant={"link"}
										color={colorMain}
									>
										Sign Up
									</Button>

									<Button
										as={Link}
										to={"/login"}
										fontSize={"sm"}
										fontWeight={700}
										color={textColor}
										bg={bgColor}
										_hover={{
											bg: bgHoverColor,
										}}
									>
										Sign In
									</Button>
								</Stack>
							)}
						</Stack>
					</Flex>
				</Flex>
			</MainContainer>
		</Box>
	);
};

export default Header;
