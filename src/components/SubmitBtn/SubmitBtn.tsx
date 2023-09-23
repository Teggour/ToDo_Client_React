import { FC } from "react";
import { Input, InputProps } from "@chakra-ui/react";

interface IProps extends InputProps {
	value?: string;
}

const SubmitBtn: FC<IProps> = ({ value = "Submit", ...props }) => {
	return <Input {...props} type="submit" value={value} cursor={'pointer'} />;
};

export default SubmitBtn;
