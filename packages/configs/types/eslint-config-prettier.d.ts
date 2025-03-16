// Wrote this myself based on the source: https://github.com/prettier/eslint-config-prettier/blob/9160ca2476b3bbf0937159112cc036ebdad9c1c7/index.js
declare module 'eslint-config-prettier' {
	import type {Linter} from 'eslint';

	const config: {
		rules: Linter.RulesRecord;
	};

	export default config;
}
