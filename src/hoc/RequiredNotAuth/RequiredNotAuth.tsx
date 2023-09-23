import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

interface IProps {
	children: ReactNode;
}

const RequiredNotAuth: FC<IProps> = ({ children }) => {
	const isAuth = useAuthStore((store) => store.isAuth);

	const location = useLocation();

	return isAuth ? (
		<Navigate to="/tasks" replace state={{ redirectFrom: location }} />
	) : (
		children
	);
};

export default RequiredNotAuth;
