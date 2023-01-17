import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { appQueryClient, appTrpcClient, trpc } from "@utils/trpc";
import IndexPage from "@pages/index";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
]);

function App() {
  return (
    <trpc.Provider queryClient={appQueryClient} client={appTrpcClient}>
      <QueryClientProvider client={appQueryClient}>
        <RouterProvider router={appRouter} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;

