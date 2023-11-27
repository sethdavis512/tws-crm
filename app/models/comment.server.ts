import { prisma } from '~/utils/prisma.server';

export function getComment({ commentId }: { commentId: string }) {
    return prisma.comment.findUnique({
        where: {
            id: commentId
        }
    });
}

export function deleteComment({ commentId }: { commentId: string }) {
    return prisma.comment.delete({
        where: {
            id: commentId
        }
    });
}
