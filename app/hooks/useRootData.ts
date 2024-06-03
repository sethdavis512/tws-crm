import { useRouteLoaderData } from '@remix-run/react';
import type { Session } from '@supabase/supabase-js';
import type { Theme } from '~/utils/theme-provider';

interface UseRootDataResponse {
    domainUrl: string;
    env: {
        SUPABASE_URL: string;
        SUPABASE_ANON_KEY: string;
    };
    theme: Theme;
    isLoggedIn: boolean;
    serverSession: Session | null;
}

export const useRootData = (): UseRootDataResponse =>
    useRouteLoaderData('root') as UseRootDataResponse;
