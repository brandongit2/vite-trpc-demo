// Wrote this myself based on the source: https://github.com/facebook/react/blob/d4e24b349e6530a8e6c95d79ad40b32f93b47070/compiler/packages/eslint-plugin-react-compiler/src/index.ts
declare module 'eslint-plugin-react-compiler' {
	import type {ESLint, Linter} from 'eslint';

	const plugin: ESLint.Plugin & {
		configs: {
			recommended: Linter.Config;
		};
	};

	export default plugin;
}
