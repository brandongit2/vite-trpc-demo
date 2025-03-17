import {createRouter as _createRouter, RouterProvider} from '@tanstack/react-router';
import {createTRPCClient, httpBatchLink} from '@trpc/client';
import {createTRPCOptionsProxy} from '@trpc/tanstack-react-query';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import invariant from 'tiny-invariant';

import {QueryClient, QueryClientProvider} from '#src/utils/tanstack-query-cjs.js';

import {routeTree} from './route-tree.gen.js';
import {TRPCProvider} from './trpc.js';

import type {TRPCOptionsProxy} from '@trpc/tanstack-react-query';
import type {AppRouter} from '@vite-trpc-demo/backend';

function createRouter({
	queryClient,
	trpc,
}: {
	queryClient: InstanceType<typeof QueryClient>;
	trpc: TRPCOptionsProxy<AppRouter>;
}) {
	return _createRouter({
		context: {
			queryClient,
			trpc,
		},
		// Turn off TanStack Router's route loader caching in favour of TanStack Query's query cache: https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#passing-all-loader-events-to-an-external-cache
		defaultPreloadStaleTime: 0,
		routeTree,
	});
}

// https://tanstack.com/router/latest/docs/framework/react/guide/creating-a-router#router-type-safety
declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

function clientInit() {
	const rootElement = document.getElementById('root');
	invariant(rootElement, 'Root element not found');

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	});

	const trpcClient = createTRPCClient<AppRouter>({
		links: [httpBatchLink({url: import.meta.env.VITE_BACKEND_URL})],
	});

	const trpc = createTRPCOptionsProxy<AppRouter>({
		client: trpcClient,
		queryClient,
	});

	const router = createRouter({queryClient, trpc});

	createRoot(rootElement).render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
					<RouterProvider router={router} />
				</TRPCProvider>
			</QueryClientProvider>
		</StrictMode>,
	);
}

clientInit();
