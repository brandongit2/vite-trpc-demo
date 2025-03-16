// This file fixes type incompatibilities between between `@trpc/tanstack-react-query` and `@tanstack/react-query`.
// Import from this file instead of `@tanstack/react-query` if you encounter type errors.
// https://github.com/trpc/trpc/issues/6554

import {
	QueryClient as _QueryClient,
	QueryClientProvider as _QueryClientProvider,
	useQuery as _useQuery,
	useSuspenseQuery as _useSuspenseQuery,
} from '@tanstack/react-query';

import type {
	QueryClient as QueryClient_Cjs,
	QueryClientProvider as QueryClientProvider_Cjs,
	useQuery as useQuery_cjs,
	useSuspenseQuery as useSuspenseQuery_cjs,
} from '@tanstack/react-query' with {'resolution-mode': 'require'};

export const QueryClient = _QueryClient as unknown as typeof QueryClient_Cjs;
export const QueryClientProvider = _QueryClientProvider as unknown as typeof QueryClientProvider_Cjs;
export const useQuery = _useQuery as unknown as typeof useQuery_cjs;
export const useSuspenseQuery = _useSuspenseQuery as unknown as typeof useSuspenseQuery_cjs;
