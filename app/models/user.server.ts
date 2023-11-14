import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { prisma } from '~/utils/prisma.server';

export type { User } from '@prisma/client';

export async function getUserById(id: User['id']) {
    return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
    email: User['email'],
    password: string,
    firstName: string,
    lastName: string
) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            profile: {
                firstName,
                lastName
            }
        }
    });
}

export async function deleteUserByEmail(email: User['email']) {
    return prisma.user.delete({ where: { email } });
}
