import EventTable from "./EventTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/antd.min.css";

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
