import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import invariant from 'tiny-invariant';

import {
    addCommentToInteraction,
    deleteInteraction,
    getInteraction
} from '~/models/interaction.server';
import { Urls } from '~/utils/constants';
import { CommentsSection } from '~/components/CommentsSection';
import { getUserId } from '~/utils/auth.server';
import { Drawer } from '~/components/Drawer';
import { useEffect, useState } from 'react';

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
    const navigate = useNavigate();
    const [isDrawerOpen, toggleDrawerOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            toggleDrawerOpen(true);
        }, 100);
    }, []);

    return (
        <Drawer
            id="interactionDetailsComments"
            size="md"
            heading="Comments"
            isOpen={isDrawerOpen}
            position="right"
            handleClose={() =>
                navigate(`/interactions/${interactionDetails?.id}`)
            }
        >
            {interactionDetails?.comments &&
                interactionDetails?.comments.length > 0 && (
                    <CommentsSection
                        intentValue="create"
                        comments={interactionDetails?.comments}
                    />
                )}
        </Drawer>
    );
}
