/// <reference types="vite/client" />

// (Somewhat) allow arbitrary named imports from CSS Modules: https://stackoverflow.com/a/73423677/3944900
// typescript-eslint will still complain about the imports being `any`, so you'll need to also cast imports to `string` manually.
declare module '*.module.css';

interface ImportMetaEnv {
	readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
