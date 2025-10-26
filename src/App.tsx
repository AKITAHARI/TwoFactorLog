import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MultiStepAuth } from "./components/MultiStepAuth";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MultiStepAuth />
        </QueryClientProvider>
    );
}
