import {createFileRoute} from '@tanstack/react-router';

import {useSuspenseQuery} from '#src/utils/tanstack-query-cjs.js';

export const Route = createFileRoute('/')({
	beforeLoad: ({context: {trpc}}) => ({
		helloWorldOptions: trpc.helloWorld.queryOptions(),
	}),
	loader: async ({context: {queryClient, helloWorldOptions}}) => {
		await queryClient.prefetchQuery(helloWorldOptions);
	},
	component: RootIndex,
});

function RootIndex() {
	const {helloWorldOptions} = Route.useRouteContext();

	const {
		data: {greeting},
	} = useSuspenseQuery(helloWorldOptions);

	return <p>{greeting}</p>;
}
