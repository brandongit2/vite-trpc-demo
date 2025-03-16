import {publicProcedure, router} from './trpc.js';

export const appRouter = router({
	helloWorld: publicProcedure.query(() => {
		return {
			greeting: 'Hello, world!',
		};
	}),
});

export type AppRouter = typeof appRouter;
