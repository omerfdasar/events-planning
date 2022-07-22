import "./App.css";
import EventTable from "./EventTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <EventTable />
      </QueryClientProvider>
    </div>
  );
}

export default App;
