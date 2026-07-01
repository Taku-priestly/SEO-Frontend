import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#f1f5f9" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" } },
        }}
      />
    </QueryClientProvider>
  );
}
