import {TanStackRouterVite} from '@tanstack/router-plugin/vite';
import vitePluginReactSwc from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';

export {config as default};

const config = defineConfig({
	root: 'src',
	envDir: '../',
	build: {
		outDir: '../dist',
		target: 'esnext',
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
		devSourcemap: true,
	},
	plugins: [
		TanStackRouterVite({
			routesDirectory: './src/routes',
			generatedRouteTree: './src/route-tree.gen.ts',
			autoCodeSplitting: true,
			quoteStyle: 'double',
			semicolons: true,
			addExtensions: true,
		}),
		vitePluginReactSwc({
			devTarget: 'es2023',
		}),
	],
});
