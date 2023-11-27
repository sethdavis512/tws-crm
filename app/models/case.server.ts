import type { Case } from '@prisma/client';

import { prisma } from '~/utils/prisma.server';

export function getCase({ id }: Pick<Case, 'id'>) {
    return prisma.case.findFirst({
        where: { id },
        include: {
            createdBy: true,
            comments: true,
            companies: true,
            interactions: true
        }
    });
}

export function getAllCases() {
    return prisma.case.findMany({
        include: {
            companies: true
        }
    });
}

export function getLatestCases(take = 5) {
    return prisma.case.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            companies: true
        },
        take
    });
}

export function createCase({
    description,
    title,
    companies,
    userId
}: Pick<Case, 'title' | 'description'> & {
    userId: string;
    companies: { id: string }[];
}) {
    return prisma.case.create({
        data: {
            title,
            description,
            companies: {
                connect: companies
            },
            userId
        },
        include: {
            createdBy: true
        }
    });
}

export function updateCase({
    id,
    title,
    description
}: Pick<Case, 'id' | 'title' | 'description'>) {
    return prisma.case.update({
        where: {
            id
        },
        data: {
            title,
            description
        }
    });
}

export function connectInteractionsToCase({
    id,
    interactionIds
}: {
    id: string;
    interactionIds: string[];
}) {
    return prisma.case.update({
        where: { id },
        data: {
            interactions: {
                connect: interactionIds.map((interactionId) => ({
                    id: interactionId
                }))
            }
        }
    });
}

export function addCommentToCase({
    id,
    comment,
    userId
}: Pick<Case, 'id'> & { comment: string; userId: string }) {
    return prisma.case.update({
        where: {
            id
        },
        data: {
            comments: {
                create: [
                    {
                        userId,
                        text: comment
                    }
                ]
            }
        }
    });
}

export function deleteCase({ id }: Pick<Case, 'id'>) {
    return prisma.case.delete({
        where: { id }
    });
}
