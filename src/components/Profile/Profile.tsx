import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Avatar,
	Flex,
	Link,
	List,
	ListItem,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { IUser } from "../../api/services/auth.service";
import { useAuthProfile } from "../../api/hooks/useAuthProfile";
import ProfileSkeleton from "./Skeleton";

// TODO: refactoring
export enum Role {
	User = "user",
	Admin = "admin",
}

interface IProps {}

const Profile: FC<IProps> = () => {
	const textColor = useColorModeValue("gray.800", "gray.100");

	const { data, isLoading } = useAuthProfile();

	if (isLoading) return <ProfileSkeleton />;

	const user = data?.data as IUser;

	const updatedAt = new Date(user.updatedAt).toLocaleDateString();
	const createdAt = new Date(user.createdAt).toLocaleDateString();
	const fullname = `${user.firstName} ${user.lastName}`;

	return (
		<Flex pt={8} align={"center"} direction={"column"}>
			<Flex direction={"row"} align={"center"} mb={"4"}>
				<Text
					fontSize={{ base: "16px", lg: "18px" }}
					color={textColor}
					fontWeight={"500"}
					textTransform={"uppercase"}
					mr={8}
				>
					User profile:
				</Text>

				<Link as={RouterLink} to={"/profile/edit"}>
					<Flex align={"center"}>
						<EditIcon /> Edit
					</Flex>
				</Link>
			</Flex>

			<List spacing={3}>
				<ListItem display={"flex"}>
					<Avatar
						name={fullname}
						getInitials={(name) => name[0]}
						size={"xl"}
						bg={"gray.500"}
					/>
				</ListItem>

				<ListItem>
					<Text as={"span"} fontWeight={"bold"}>
						First name:
					</Text>
					&nbsp;{user.firstName}
				</ListItem>

				<ListItem>
					<Text as={"span"} fontWeight={"bold"}>
						Last name:
					</Text>
					&nbsp;{user.lastName}
				</ListItem>

				<ListItem>
					<Text as={"span"} fontWeight={"bold"}>
						Email:
					</Text>
					&nbsp;{user.email}
				</ListItem>

				<ListItem>
					<Text as={"span"} fontWeight={"bold"}>
						Roles:
					</Text>
					&nbsp;
					{user.role.map((role) => role.toUpperCase()).join(", ")}
				</ListItem>

				<ListItem>
					<Text as={"span"} fontWeight={"bold"}>
						Created at:
					</Text>
					&nbsp;{createdAt}
				</ListItem>

				<ListItem>
					<Text as={"span"} fontWeight={"bold"}>
						Updated at:
					</Text>
					&nbsp;{updatedAt}
				</ListItem>
			</List>
		</Flex>
	);
};

export default Profile;
