import tsEslint from 'typescript-eslint';

import baseConfig from '@vite-trpc-demo/configs/eslint.config.base.ts';

export {config as default};

const config = tsEslint.config([
	...baseConfig,

	{
		name: '@vite-trpc-demo/monorepo/ignores',
		ignores: ['packages/**/*'], // Only lint files in the monorepo root
	},
]);
