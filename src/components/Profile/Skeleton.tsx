import { FC } from "react";
import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const ProfileSkeleton: FC = () => {
	return (
		<Flex pt={8} align={"center"} direction={"column"}>
			<Flex direction={"row"} align={"center"} mb={"4"}>
				<Skeleton height="30px" width={"200px"} />
			</Flex>

			<Flex align={"center"} direction={"column"} gap={3}>
				<SkeletonCircle size={"100px"} />

				<Skeleton height="20px" width={"140px"} />
				<Skeleton height="20px" width={"140px"} />
				<Skeleton height="20px" width={"140px"} />
				<Skeleton height="20px" width={"140px"} />
				<Skeleton height="20px" width={"140px"} />
				<Skeleton height="20px" width={"140px"} />
			</Flex>
		</Flex>
	);
};

export default ProfileSkeleton;
