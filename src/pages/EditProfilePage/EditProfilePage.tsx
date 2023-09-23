import { FC } from "react";
import { Box } from "@chakra-ui/react";
import EditProfile from "../../components/EditProfile";

interface IProps {}

const EditProfilePage: FC<IProps> = () => {
	return (
		<Box maxW={"xs"} m={"0 auto"}>
			<EditProfile />
		</Box>
	);
};

export default EditProfilePage;
