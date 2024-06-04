import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { getSupabaseWithSessionAndHeaders } from '~/utils/supabase.server';
import { useSupabase } from '~/utils/supabase';
import { useRootData } from '~/hooks/useRootData';
import { BACKGROUND_COLORS, BORDER_COLORS, Urls } from '~/constants';
import { Button } from '@lemonsqueezy/wedges';

export const meta: MetaFunction = () => [{ title: 'Login' }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
        request,
    });

    if (serverSession) {
        return redirect(Urls.DASHBOARD, { headers });
    }

    return json({ success: true }, { headers });
};

export default function LoginRoute() {
    const { domainUrl, env, serverSession } = useRootData();
    const { supabase } = useSupabase({ env, serverSession });

    const redirectTo = `${domainUrl}/api/auth/callback`;

    const handleGoogleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo,
            },
        });
    };

    return (
        <div className="flex h-full items-center justify-center bg-gradient-to-t from-primary-200 dark:from-primary-950">
            <div
                className={`mx-auto w-full max-w-md border p-8 ${BORDER_COLORS} rounded-lg ${BACKGROUND_COLORS}`}
            >
                <h1 className="mb-4 text-4xl font-bold">Login</h1>
                <p className="mb-8">Choose a login method</p>
                <div className="flex gap-2">
                    <Button
                        before={
                            <svg
                                className="fill-white dark:fill-white"
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Google</title>
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                        }
                        onClick={handleGoogleSignIn}
                        className="flex gap-3"
                    >
                        Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
