import { FC } from "react";
import { Skeleton, useColorModeValue } from "@chakra-ui/react";

const TaskSkeleton: FC = () => {
	return (
		<Skeleton
			height="115px"
			mb={5}
			rounded={8}
			startColor={useColorModeValue("gray.500", "gray.600")}
			endColor={useColorModeValue("gray.600", "gray.500")}
		/>
	);
};

export { TaskSkeleton };
