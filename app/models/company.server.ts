import type { Company } from '@prisma/client';

import { prisma } from '~/utils/prisma.server';

export function getCompany({ id }: Pick<Company, 'id'>) {
    return prisma.company.findFirst({
        where: { id },
        include: {
            customers: true,
            comments: true
        }
    });
}

export function getAllCompanies() {
    return prisma.company.findMany({});
}

export function addCommentToCompany({
    id,
    comment
}: Pick<Company, 'id'> & { comment: string }) {
    return prisma.company.update({
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

// export function createInteraction({
//     description,
//     title,
//     customerId
// }: Pick<Interaction, 'title' | 'description' | 'customerId'>) {
//     return prisma.interaction.create({
//         data: {
//             title,
//             description,
//             customerId
//         }
//     });
// }

export function deleteCompany({ id }: Pick<Company, 'id'>) {
    return prisma.company.delete({
        where: { id }
    });
}
