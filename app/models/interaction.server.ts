import type { Interaction, Customer } from '@prisma/client';

import { prisma } from '~/utils/prisma.server';

export function getInteraction({ id }: Pick<Interaction, 'id'>) {
    return prisma.interaction.findFirst({
        where: { id },
        include: {
            createdBy: true,
            customer: true,
            comments: true
        }
    });
}

export function getAllInteractions() {
    return prisma.interaction.findMany({
        include: {
            customer: true
        }
    });
}

export function getLatestInteractions(take = 5) {
    return prisma.interaction.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            customer: true
        },
        take
    });
}

export function updateInteraction({
    id,
    title,
    description,
    type
}: Pick<Interaction, 'id' | 'title' | 'description' | 'type'>) {
    return prisma.interaction.update({
        where: {
            id
        },
        data: {
            title,
            description,
            type
        }
    });
}

export function getFirstInteraction() {
    return prisma.interaction.findFirst({
        include: {
            customer: true
        }
    });
}

export function getInteractionsByCustomerId({
    customerId
}: {
    customerId: Customer['id'];
}) {
    return prisma.interaction.findMany({
        where: { customerId },
        select: { id: true, title: true },
        orderBy: { updatedAt: 'desc' }
    });
}

export function createInteraction({
    description,
    title,
    customerId,
    userId,
    type
}: Pick<
    Interaction,
    'title' | 'description' | 'customerId' | 'type' | 'userId'
>) {
    return prisma.interaction.create({
        data: {
            type,
            title,
            description,
            customerId,
            userId
        },
        include: {
            createdBy: true
        }
    });
}

export function addCommentToInteraction({
    id,
    comment,
    userId
}: Pick<Interaction, 'id'> & { comment: string; userId: string }) {
    return prisma.interaction.update({
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

export function deleteInteraction({ id }: Pick<Interaction, 'id'>) {
    return prisma.interaction.delete({
        where: { id }
    });
}
