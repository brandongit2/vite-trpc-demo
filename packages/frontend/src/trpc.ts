import {createTRPCClient, httpBatchLink} from '@trpc/client';
import {createTRPCContext} from '@trpc/tanstack-react-query';

import type {AppRouter} from '@vite-trpc-demo/backend';

export const {TRPCProvider, useTRPC} = createTRPCContext<AppRouter>();

export const manualTrpcClient = createTRPCClient<AppRouter>({
	links: [httpBatchLink({url: import.meta.env.VITE_BACKEND_URL})],
});
