import { FC } from "react";
import { Box } from "@chakra-ui/react";
import Profile from "../../components/Profile";

interface IProps {}

const ProfilePage: FC<IProps> = () => {
	return (
		<Box maxW={"sm"} m={"0 auto"}>
			<Profile />
		</Box>
	);
};

export default ProfilePage;
