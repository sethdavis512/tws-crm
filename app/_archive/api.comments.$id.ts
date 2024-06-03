import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { addCommentToCase } from '~/models/case.server';

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
    const form = await request.formData();
    const intent = form.get('intent') as string;

    if (request.method === 'POST') {
        if (intent === 'addCommentToCase') {
            const userId = form.get('userId') as string;
            invariant(userId, 'userId doesnt exist');

            const comment = form.get('comment') as string;
            invariant(comment, 'Comment doesnt exist');

            const caseId = form.get('caseId') as string;
            invariant(caseId, 'caseId doesnt exist');

            await addCommentToCase({ id: caseId, comment, userId });
        }
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
