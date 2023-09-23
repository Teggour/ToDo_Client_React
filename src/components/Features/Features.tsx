import { FC, ReactElement } from "react";
import { Box, SimpleGrid, Icon } from "@chakra-ui/react";
import { CheckIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import Feature from "../Feature";

interface IProps {}

interface IFeature {
	title: string;
	text: string;
	icon: ReactElement;
}

const Features: FC<IProps> = () => {
	const features: IFeature[] = [
		{
			icon: <Icon as={ViewIcon} w={10} h={10} color={"gray.100"} />,
			title: "Visual Clarity",
			text: "Provides a clear overview of tasks and their progress.",
		},
		{
			icon: <Icon as={TimeIcon} w={10} h={10} color={"gray.100"} />,
			title: "Time Management",
			text: "Helps users manage their time effectively.",
		},
		{
			icon: <Icon as={CheckIcon} w={10} h={10} color={"gray.100"} />,
			title: "Flexibility",
			text: "Adaptable to different workflows, from project management to personal task lists.",
		},
	];

	return (
		<Box p={4}>
			<SimpleGrid columns={3} spacing={4}>
				{features.map(({ icon, title, text }) => (
					<Feature
						key={title}
						icon={icon}
						title={title}
						text={text}
					/>
				))}
			</SimpleGrid>
		</Box>
	);
};

export default Features;
