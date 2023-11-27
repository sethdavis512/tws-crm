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
    comment,
    userId
}: Pick<Customer, 'id'> & { comment: string; userId: string }) {
    return prisma.customer.update({
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

export function updateCustomer({
    id,
    firstName,
    lastName
}: Pick<Customer, 'id' | 'firstName' | 'lastName'>) {
    return prisma.customer.update({
        where: {
            id
        },
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
