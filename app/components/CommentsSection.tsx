import { formatTheDate } from '~/utils';
import { Card } from './Card';
import { useState } from 'react';
import { ReadMoreButton } from './ReadMoreButton';
import { useFetcher } from '@remix-run/react';
import { DeleteButton } from './DeleteButton';
import { Stack } from './Stack';
import { Label } from './Label';
import { Textarea } from './Textarea';
import { Button } from './Button';

interface CommentsSectionProps {
    // TODO: Fix types
    comments: any[];
    intentValue: string;
}

export function CommentsSection({
    comments,
    intentValue
}: CommentsSectionProps) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const commentFetcher = useFetcher();

    const handleExpanded = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (expanded === event.currentTarget.value) {
            setExpanded(null);
        } else {
            setExpanded(event.currentTarget.value);
        }
    };

    return (
        <>
            <ul className="mb-8 space-y-4">
                {comments && comments.length > 0 ? (
                    comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <Card>
                                    <div className="flex flex-col">
                                        <span className="block text-sm text-gray-400 mb-2">
                                            {formatTheDate(
                                                comment.createdAt as unknown as string
                                            )}
                                        </span>
                                        <div className="flex">
                                            <p className="mb-4">
                                                {expanded === comment.id ||
                                                comment.text.length < 100
                                                    ? comment.text
                                                    : `${comment.text.substring(
                                                          0,
                                                          100
                                                      )}...`}
                                            </p>
                                        </div>
                                        <Stack>
                                            {comment.text.length > 100 && (
                                                <ReadMoreButton
                                                    show={
                                                        expanded === comment.id
                                                    }
                                                    onClick={handleExpanded}
                                                    value={comment.id}
                                                />
                                            )}
                                            <commentFetcher.Form
                                                method="DELETE"
                                                action={`/api/comments/${comment.id}`}
                                            >
                                                <DeleteButton />
                                            </commentFetcher.Form>
                                        </Stack>
                                    </div>
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
