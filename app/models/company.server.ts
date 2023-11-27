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
    comment,
    userId
}: Pick<Company, 'id'> & { comment: string; userId: string }) {
    return prisma.company.update({
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

export function updateCompany({ id, name }: Pick<Company, 'id' | 'name'>) {
    return prisma.company.update({
        where: {
            id
        },
        data: {
            name
        }
    });
}

export function createCompany({ name }: Pick<Company, 'name'>) {
    return prisma.company.create({
        data: {
            name
        }
    });
}

export function deleteCompany({ id }: Pick<Company, 'id'>) {
    return prisma.company.delete({
        where: { id }
    });
}
