import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RequiredAuth from "../../hoc/RequiredAuth";
import RequiredNotAuth from "../../hoc/RequiredNotAuth";
import NotFoundPage from "../../pages/NotFoundPage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import TaskBoardPage from "../../pages/TaskBoardPage";
import ProfilePage from "../../pages/ProfilePage";
import EditProfilePage from "../../pages/EditProfilePage";
import ChangePasswordPage from "../../pages/ChangePasswordPage";
import EditTaskPage from "../../pages/EditTaskPage";
import PageTemplate from "../PageTemplate";

const Router: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<PageTemplate />}>
				{/* Not found page */}
				<Route path="*" element={<Navigate to="/404" replace />} />
				<Route path="404" element={<NotFoundPage />} />

				{/* Home */}
				<Route index element={<Navigate to="/info" replace />} />
				<Route path="home" element={<Navigate to="/info" replace />} />
				<Route
					path="homepage"
					element={<Navigate to="/info" replace />}
				/>

				{/* Info */}
				<Route path="info" element={<HomePage />} />

				{/* Login */}
				<Route
					path="login"
					element={
						<RequiredNotAuth>
							<LoginPage />
						</RequiredNotAuth>
					}
				/>
				<Route
					path="signin"
					element={<Navigate to="/login" replace />}
				/>
				<Route
					path="sign-in"
					element={<Navigate to="/login" replace />}
				/>

				{/* Registration */}
				<Route
					path="register"
					element={
						<RequiredNotAuth>
							<RegisterPage />
						</RequiredNotAuth>
					}
				/>
				<Route
					path="signup"
					element={<Navigate to="/register" replace />}
				/>
				<Route
					path="sign-up"
					element={<Navigate to="/register" replace />}
				/>

				{/* Task board */}
				<Route
					path="tasks"
					element={
						<RequiredAuth>
							<TaskBoardPage />
						</RequiredAuth>
					}
				/>
				<Route
					path="task-board"
					element={<Navigate to="/tasks" replace />}
				/>

				{/* Edit task */}
				<Route
					path="task/:id/edit"
					element={
						<RequiredAuth>
							<EditTaskPage />
						</RequiredAuth>
					}
				/>

				{/* Profile */}
				<Route
					path="profile"
					element={
						<RequiredAuth>
							<ProfilePage />
						</RequiredAuth>
					}
				/>
				<Route
					path="profile/edit"
					element={
						<RequiredAuth>
							<EditProfilePage />
						</RequiredAuth>
					}
				/>
				<Route
					path="profile/change-password"
					element={
						<RequiredAuth>
							<ChangePasswordPage />
						</RequiredAuth>
					}
				/>
				<Route
					path="profile/password-change"
					element={
						<RequiredAuth>
							<Navigate to="/profile/change-password" replace />
						</RequiredAuth>
					}
				/>
			</Route>
		</Routes>
	);
};

export default Router;
