import { createTRPCReact } from "@trpc/react-query";
import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@server/src/server/trpc";

export const trpc = createTRPCReact<AppRouter>();

const appQueryClient = new QueryClient();

const appTrpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api",
    }),
  ],
});

export { appQueryClient, appTrpcClient };
