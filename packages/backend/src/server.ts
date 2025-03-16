import {createHTTPServer} from '@trpc/server/adapters/standalone';
import cors from 'cors';

import {appRouter} from './router.js';

createHTTPServer({
	middleware: cors(),
	router: appRouter,
}).listen(2025, () => {
	console.info('Listening on http://localhost:2025');
});
