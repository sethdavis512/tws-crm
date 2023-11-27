import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { deleteComment, getComment } from '~/models/comment.server';

export async function loader({ params }: LoaderFunctionArgs) {
    const commentId = params.id;
    invariant(commentId, 'Invalid comment ID');
    const comment = await getComment({ commentId });

    return json({
        comment
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const commentId = params.id;
    invariant(commentId, 'Invalid comment ID');

    if (request.method === 'POST') {
        /* handle "POST" */
    } else if (request.method === 'PUT') {
        /* handle "PUT" */
    } else if (request.method === 'PATCH') {
        /* handle "PATCH" */
    } else if (request.method === 'DELETE') {
        try {
            await deleteComment({ commentId });

            return json({ success: true }, 200);
        } catch (error) {
            return json({ error }, 400);
        }
    }
}
