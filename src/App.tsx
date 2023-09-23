import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./components/Router";

const App: FC = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { refetchOnWindowFocus: false },
		},
	});

	return (
		<BrowserRouter>
			<ChakraProvider>
				<QueryClientProvider client={queryClient}>
					<Router />
				</QueryClientProvider>
			</ChakraProvider>
		</BrowserRouter>
	);
};

export default App;
