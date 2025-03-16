import baseConfig from '@vite-trpc-demo/configs/eslint.config.base.ts';
import tsEslint from 'typescript-eslint';

export {config as default};

const config = tsEslint.config([
	...baseConfig,

	{
		name: '@vite-trpc-demo/frontend/ignores',
		ignores: ['dist/', 'src/route-tree.gen.ts'],
	},
]);
