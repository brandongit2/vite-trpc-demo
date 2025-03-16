import {createRootRouteWithContext, HeadContent, Outlet} from '@tanstack/react-router';

import type {QueryClient} from '#src/utils/tanstack-query-cjs.js';
import type {TRPCOptionsProxy} from '@trpc/tanstack-react-query';
import type {AppRouter} from '@vite-trpc-demo/backend';

export type RouterContext = {
	queryClient: InstanceType<typeof QueryClient>;
	trpc: TRPCOptionsProxy<AppRouter>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootLayout,
});

function RootLayout() {
	return (
		<div>
			<HeadContent />

			<Outlet />
		</div>
	);
}
