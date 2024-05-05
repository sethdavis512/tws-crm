import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import {
    addCommentToInteraction,
    deleteInteraction,
    getInteraction
} from '~/models/interaction.server';
import { BORDER_LEFT_COLORS, Urls } from '~/utils/constants';
import { CommentsSection } from '~/components/CommentsSection';
import { getUserId } from '~/utils/auth.server';
import { StickyHeader } from '~/components/StickyHeader';

export async function loader({ params }: LoaderFunctionArgs) {
    const interactionId = params.id;
    invariant(interactionId, 'Interaction ID not found');

    const interactionDetails = await getInteraction({ id: interactionId });

    return json({
        interactionDetails
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const userId = await getUserId(request);
    const { id: interactionId } = params;
    invariant(interactionId, 'ID doesnt exist');

    const form = await request.formData();
    const intent = form.get('intent');

    if (intent === 'delete') {
        await deleteInteraction({ id: interactionId });

        return redirect(Urls.INTERACTIONS);
    } else if (intent === 'create') {
        const comment = form.get('comment') as string;
        invariant(comment, 'Comment doesnt exist');
        invariant(userId, 'userId doesnt exist');

        await addCommentToInteraction({ id: interactionId, comment, userId });

        return null;
    } else {
        return null;
    }
}

export default function InteractionDetailsRoute() {
    const { interactionDetails } = useLoaderData<typeof loader>();

    return (
        <div className={`col-span-3 ${BORDER_LEFT_COLORS} overflow-y-auto`}>
            <StickyHeader text="Comments" />
            <div className="p-4">
                {interactionDetails?.comments &&
                interactionDetails?.comments.length > 0 ? (
                    <CommentsSection
                        intentValue="create"
                        comments={interactionDetails.comments}
                    />
                ) : (
                    <div className="mt-4 mb-8 italic">
                        <p>No comments to display...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
