declare module 'react' {
	interface CSSProperties {
		// Allow declaring CSS custom properties in `style` props
		[key: `--${string}`]: string | number;
	}
}

export {};
