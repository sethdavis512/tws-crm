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
    userId
}: Pick<Interaction, 'title' | 'description' | 'customerId'> & {
    userId: string;
}) {
    return prisma.interaction.create({
        data: {
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
    comment
}: Pick<Interaction, 'id'> & { comment: string }) {
    return prisma.interaction.update({
        where: {
            id
        },
        data: {
            comments: {
                create: {
                    text: comment
                }
            }
        }
    });
}

export function deleteInteraction({ id }: Pick<Interaction, 'id'>) {
    return prisma.interaction.delete({
        where: { id }
    });
}
