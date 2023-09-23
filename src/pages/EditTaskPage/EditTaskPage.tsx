import { FC } from "react";
import { Box } from "@chakra-ui/react";
import EditTask from "../../components/EditTask";

interface IProps {}

const EditTaskPage: FC<IProps> = () => {
	return (
		<Box maxW={"xs"} m={"0 auto"}>
			<EditTask />
		</Box>
	);
};

export default EditTaskPage;
