import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevToolsBubble } from "react-native-react-query-devtools";

import { Main } from "./src/Main";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
      <DevToolsBubble />
    </QueryClientProvider>
  );
}
