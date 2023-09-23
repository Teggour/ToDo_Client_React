import { FC } from "react";
import { Box } from "@chakra-ui/react";
import ChangePassword from "../../components/ChangePassword";

interface IProps {}

const ChangePasswordPage: FC<IProps> = () => {
	return (
		<Box maxW={"xs"} m={"0 auto"}>
			<ChangePassword />
		</Box>
	);
};

export default ChangePasswordPage;
