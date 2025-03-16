import tsEslint from 'typescript-eslint';

import baseConfig, {allJsTsExtensions} from './eslint.config.base.ts';

export {config as default};

const config = tsEslint.config([
	...baseConfig,

	{
		name: '@vite-trpc-demo/configs/js-ts-rules',
		files: [`**/*${allJsTsExtensions}`],
		rules: {
			'import-x/extensions': ['error', 'ignorePackages'],
		},
	},
]);
