import type { Customer, Interaction } from '@prisma/client';

import { prisma } from '~/utils/prisma.server';

export function getCustomer({ id }: Pick<Interaction, 'id'>) {
    return prisma.customer.findFirst({
        where: { id },
        include: {
            interactions: true,
            comments: true
        }
    });
}

export function getAllCustomers() {
    return prisma.customer.findMany({});
}

export function addCommentToCustomer({
    id,
    comment
}: Pick<Customer, 'id'> & { comment: string }) {
    return prisma.customer.update({
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

// export function getFirstInteraction() {
//     return prisma.interaction.findFirst({
//         include: {
//             customer: true
//         }
//     });
// }

// export function getInteractionsByCustomerId({
//     customerId
// }: {
//     customerId: Customer['id'];
// }) {
//     return prisma.interaction.findMany({
//         where: { customerId },
//         select: { id: true, title: true },
//         orderBy: { updatedAt: 'desc' }
//     });
// }

export function createCustomer({
    firstName,
    lastName
}: Pick<Customer, 'firstName' | 'lastName'>) {
    return prisma.customer.create({
        data: {
            firstName,
            lastName
        }
    });
}

export function deleteCustomer({ id }: Pick<Customer, 'id'>) {
    return prisma.customer.delete({
        where: { id }
    });
}
