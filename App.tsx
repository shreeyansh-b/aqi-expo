import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DevToolsBubble } from "react-native-react-query-devtools";

import { Main } from "./src/Main";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Main />
      </GestureHandlerRootView>
      <DevToolsBubble />
    </QueryClientProvider>
  );
}
