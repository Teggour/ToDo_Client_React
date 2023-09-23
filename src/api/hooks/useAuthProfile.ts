import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

const useAuthProfile = () => {
	return useQuery(["auth profile"], () => authService.getProfile(), {
		select: ({ data }) => data,
	});
};

export { useAuthProfile };
