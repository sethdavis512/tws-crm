import { formatTheDate } from '~/utils';
import { Card } from './Card';
import { useFetcher } from '@remix-run/react';
import { DeleteButton } from './DeleteButton';
import { Stack } from './Stack';
import { Label } from './Label';
import { Textarea } from './Textarea';
import { Button } from './Button';

interface CommentsSectionProps {
    // TODO: Fix types
    comments: any[];
    intentValue: 'create' | 'addCommentToCase';
}

export function CommentsSection({
    comments,
    intentValue
}: CommentsSectionProps) {
    const commentFetcher = useFetcher();

    return (
        <>
            <ul className="mb-8 space-y-4">
                {comments && comments.length > 0 ? (
                    comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <Card className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="block text-sm text-zinc-400 mb-2">
                                            {formatTheDate(
                                                comment.createdAt as unknown as string
                                            )}
                                        </span>
                                        <div className="flex">
                                            <p className="mb-4">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </div>
                                    <Stack>
                                        <commentFetcher.Form
                                            method="DELETE"
                                            action={`/api/comments/${comment.id}`}
                                        >
                                            <DeleteButton />
                                        </commentFetcher.Form>
                                    </Stack>
                                </Card>
                            </li>
                        );
                    })
                ) : (
                    <div className="mt-4 mb-8 italic">
                        <p>No comments to display...</p>
                    </div>
                )}
            </ul>
            <commentFetcher.Form method="POST">
                <Label htmlFor="addComment">Add comment</Label>
                <Textarea id="addComment" name="comment" className="mb-4" />
                <Button name="intent" value={intentValue}>
                    Submit
                </Button>
            </commentFetcher.Form>
        </>
    );
}
