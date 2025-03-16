/// <reference path='./types/eslint-config-prettier.d.ts' />
/// <reference path='./types/eslint-plugin-react-compiler.d.ts' />

import js from '@eslint/js';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import tanstackRouter from '@tanstack/eslint-plugin-router';
import configPrettier from 'eslint-config-prettier';
import {createNextImportResolver} from 'eslint-import-resolver-next';
import importX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import node from 'eslint-plugin-n';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import * as _reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from 'typescript-eslint';

// https://github.com/eslint/eslint/issues/19413
const reactCompiler = _reactCompiler as unknown as typeof _reactCompiler.default;

export {config as default};

export const allJsTsExtensions = '.@(js|jsx|cjs|mjs|ts|tsx|cts|mts)';
export const onlyTsExtensions = '.@(ts|tsx|cts|mts)';
export const onlyReactExtensions = '.@(jsx|tsx)';

// On the helper function from typescript-eslint:
// https://typescript-eslint.io/packages/typescript-eslint/#config
// https://github.com/typescript-eslint/typescript-eslint/issues/8613#issuecomment-1983488262
const config = tsEslint.config([
	{
		name: 'js/recommended',
		...js.configs.recommended,
	},

	// Pattern from here: https://eslint.org/docs/latest/use/configure/combine-configs#apply-a-config-array-to-a-subset-of-files
	...[...tsEslint.configs.strictTypeChecked, ...tsEslint.configs.stylisticTypeChecked].map((config) => ({
		...config,
		files: [`**/*${onlyTsExtensions}`],
	})),

	{
		...jsdoc.configs['flat/recommended-typescript-flavor'],
		files: [`**/*${allJsTsExtensions}`],
	},
	{
		...jsdoc.configs['flat/recommended-typescript'],
		files: [`**/*${onlyTsExtensions}`],
	},

	importX.flatConfigs.recommended,
	{
		name: 'import-x/typescript',
		...importX.flatConfigs.typescript,
		files: [`**/*${onlyTsExtensions}`],
	},

	{
		name: 'n/flat/recommended',
		...node.configs['flat/recommended'],
		files: [`**/*${allJsTsExtensions}`],
	},
	{
		name: 'n/flat/recommended-module',
		...node.configs['flat/recommended-module'],
		files: ['**/*.@(js|mjs|jsx|ts|mts|tsx)'],
	},
	{
		name: 'n/flat/recommended-script',
		...node.configs['flat/recommended-script'],
		files: ['**/*.@(cjs|cts)'],
	},

	{
		name: 'react/flat/recommended',
		...react.configs.flat['recommended']!,
		files: [`**/*${onlyReactExtensions}`],
	},
	{
		name: 'react/flat/jsx-runtime',
		...react.configs.flat['jsx-runtime']!,
		files: [`**/*${onlyReactExtensions}`],
	},

	{
		...reactHooks.configs['recommended-latest'],
		files: [`**/*${onlyReactExtensions}`],
	},

	{
		name: 'react-compiler/recommended',
		...reactCompiler.configs.recommended,
		files: [`**/*${onlyReactExtensions}`],
	},

	{
		name: 'react-refresh/recommended',
		...reactRefresh.configs.recommended,
		files: [`**/*${onlyReactExtensions}`],
	},

	...tanstackRouter.configs['flat/recommended'].map((config) => ({
		name: 'tanstack-router/flat/recommended',
		...config,
		files: [`packages/frontend/src/**/*${allJsTsExtensions}`],
	})),

	...tanstackQuery.configs['flat/recommended'].map((config) => ({
		name: 'tanstack-query/flat/recommended',
		...config,
		files: [`packages/frontend/src/**/*${allJsTsExtensions}`],
	})),

	configPrettier,

	{
		name: '@vite-trpc-demo/base/js-ts-rules',
		files: [`**/*${allJsTsExtensions}`],
		plugins: {
			// I want to use the import-x plugin, but they don't export the plugin object directly, instead opting to only
			// export the recommended configs. Pluck out the plugin object from the recommended configs.
			...importX.flatConfigs.recommended.plugins,
			perfectionist,
		},
		settings: {
			// This `resolver-next` setting is due to replace the current `import-x/resolver` setting:
			// https://github.com/un-ts/eslint-plugin-import-x/pull/192
			'import-x/resolver-next': [createNextImportResolver({})],
			perfectionist: {
				type: 'natural',
				order: 'asc',
				ignoreCase: false,
			},
		},
		rules: {
			curly: ['error'],
			'no-console': ['warn', {allow: ['info', 'warn', 'error']}],
			'no-empty': ['warn', {allowEmptyCatch: true}],
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/index.js', '**/index.cjs', '**/index.mjs', '**/index.ts', '**/index.cts', '**/index.mts'],
							message: 'Direct imports of barrel files prohibited. Import the specific file instead.',
						},
					],
				},
			],
			'no-useless-escape': ['warn'],
			'object-shorthand': ['warn'],
			'prefer-const': ['off'],

			'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import-x/extensions': [
				'error',
				'ignorePackages',
				{js: 'ignorePackages', jsx: 'never', ts: 'never', tsx: 'never'},
			],
			'import-x/no-anonymous-default-export': ['error'],
			'import-x/no-cycle': ['error', {ignoreExternal: true}],
			'import-x/no-duplicates': ['error'],
			'import-x/no-extraneous-dependencies': ['error', {devDependencies: false}],
			'import-x/no-named-as-default': ['off'], // Annoying rule
			'import-x/order': [
				'warn',
				{
					alphabetize: {order: 'asc'},
					groups: [
						['builtin', 'external'],
						['internal'],
						['parent', 'index', 'sibling'],
						['object', 'unknown', 'type'],
					],
					'newlines-between': 'always',
				},
			],

			// Turning these off for performance reasons: https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
			'import-x/default': ['off'],
			'import-x/named': ['off'],
			'import-x/namespace': ['off'],
			'import-x/no-named-as-default-member': ['off'],

			'jsdoc/no-undefined-types': ['error'],
			'jsdoc/require-jsdoc': ['off'],
			'jsdoc/require-param': ['off'],
			'jsdoc/require-returns': ['off'],
			'jsdoc/sort-tags': ['warn'],
			'jsdoc/tag-lines': ['off'],

			'n/no-missing-import': ['off'],
			'n/prefer-node-protocol': ['error'],

			'perfectionist/sort-array-includes': ['warn', {groupKind: 'spreads-first'}],
			'perfectionist/sort-named-exports': ['warn', {groupKind: 'values-first'}],
			'perfectionist/sort-named-imports': ['warn', {groupKind: 'values-first'}],
		},
	},

	{
		// Allow importing dev dependencies in these files
		name: '@vite-trpc-demo/base/no-extraneous-dependencies-exception',
		files: [
			// Config files
			`**/*.config?(.*)${allJsTsExtensions}`,
		],
		rules: {
			'import-x/no-extraneous-dependencies': ['error', {devDependencies: true}],
		},
	},

	{
		name: '@vite-trpc-demo/base/ts-rules',
		files: [`**/*${onlyTsExtensions}`],
		languageOptions: {
			parserOptions: {
				// For typescript-eslint: https://typescript-eslint.io/packages/parser#projectservice
				projectService: true,
			},
		},
		rules: {
			'@typescript-eslint/array-type': ['error', {default: 'array-simple'}],
			'@typescript-eslint/consistent-indexed-object-style': ['off'],
			'@typescript-eslint/consistent-type-definitions': ['off'],
			'@typescript-eslint/consistent-type-imports': ['error'],
			'@typescript-eslint/no-confusing-void-expression': ['error', {ignoreArrowShorthand: true}],
			'@typescript-eslint/no-empty-function': ['warn'],
			'@typescript-eslint/no-empty-object-type': [
				'warn',
				{
					allowInterfaces: 'with-single-extends', // Allows for the interface equivalent of `type Foo = SomeOtherComplexType`.
				},
			],
			'@typescript-eslint/no-extraneous-class': ['warn'],
			'@typescript-eslint/no-floating-promises': ['error', {checkThenables: true, ignoreVoid: false}],
			'@typescript-eslint/no-non-null-assertion': ['off'],
			'@typescript-eslint/no-redundant-type-constituents': ['warn'],
			'@typescript-eslint/no-unnecessary-condition': ['warn', {allowConstantLoopConditions: true}],
			'@typescript-eslint/no-unnecessary-type-parameters': ['off'], // Complex rule; lots of false positives
			'@typescript-eslint/no-unused-expressions': ['warn'],
			'@typescript-eslint/no-unused-vars': ['warn', {ignoreRestSiblings: true}],
			'@typescript-eslint/only-throw-error': [
				'error',
				{
					allow: [
						{
							from: 'package',
							name: ['NotFoundError', 'Redirect'],
							package: '@tanstack/router-core',
						},
					],
				},
			],
			'@typescript-eslint/prefer-nullish-coalescing': ['warn'],
			'@typescript-eslint/prefer-optional-chain': ['warn'],
			'@typescript-eslint/prefer-string-starts-ends-with': ['warn'],
			'@typescript-eslint/require-await': ['warn'],
			'@typescript-eslint/restrict-plus-operands': [
				'error',
				{
					allowAny: false,
					allowBoolean: false,
					allowNullish: false,
					allowNumberAndString: true,
					allowRegExp: false,
				},
			],
			'@typescript-eslint/restrict-template-expressions': ['error', {allowNumber: true}],
			'@typescript-eslint/strict-boolean-expressions': ['error', {allowNullableBoolean: true}],
			'@typescript-eslint/triple-slash-reference': ['off'],

			'no-unreachable': ['warn'], // Re-enable after typescript-eslint config disabled it
		},
	},

	{
		name: '@vite-trpc-demo/base/react-rules',
		files: [`**/*${onlyReactExtensions}`],
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/button-has-type': ['error'],
			'react/display-name': ['warn'],
			'react/function-component-definition': ['warn'],
			'react/jsx-boolean-value': ['warn'],
			'react/jsx-curly-brace-presence': ['warn'],
			'react/jsx-fragments': ['warn'],
			'react/jsx-no-leaked-render': ['error'],
			'react/jsx-no-script-url': ['error'],
			'react/jsx-no-useless-fragment': ['warn'],
			'react/jsx-pascal-case': ['error'],
			'react/no-array-index-key': ['error'],
			'react/no-arrow-function-lifecycle': ['error'],
			'react/no-this-in-sfc': ['error'],
			'react/no-unstable-nested-components': ['error'],
			'react/no-unused-class-component-methods': ['warn'],
			'react/no-unused-prop-types': ['warn'],
			'react/prop-types': ['off'], // `noImplicitAny` would catch this
			'react/void-dom-elements-no-children': ['error'],

			'react-hooks/exhaustive-deps': ['error'],
		},
	},
]);
