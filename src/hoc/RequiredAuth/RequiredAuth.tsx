import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

interface IProps {
	children: ReactNode;
}

const RequiredAuth: FC<IProps> = ({ children }) => {
	const isAuth = useAuthStore((store) => store.isAuth);

	const location = useLocation();

	return isAuth ? (
		children
	) : (
		<Navigate to="/" replace state={{ redirectFrom: location }} />
	);
};

export default RequiredAuth;
