import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
    // Wipe the db clean...
    await prisma.user.deleteMany({});
    await prisma.company.deleteMany({});
    await prisma.interaction.deleteMany({});
    await prisma.customer.deleteMany({});

    const email = 'seth@mail.com';
    // cleanup the existing database

    const hashedPassword = await bcrypt.hash('sethiscool', 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            profile: {
                firstName: 'Seth',
                lastName: 'Davis'
            }
        }
    });

    // ===================

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const x of Array(3).fill('')) {
        const company = await prisma.company.create({
            data: {
                name: faker.company.name()
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const y of Array(3).fill('')) {
            await prisma.customer.create({
                data: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    companies: {
                        connect: [{ id: company.id }]
                    },
                    interactions: {
                        createMany: {
                            data: Array(3)
                                .fill('')
                                .map(() => {
                                    return {
                                        userId: user.id,
                                        title: faker.word.words({
                                            count: { min: 1, max: 4 }
                                        }),
                                        description: faker.word.words({
                                            count: { min: 100, max: 500 }
                                        })
                                    };
                                })
                        }
                    }
                }
            });
        }
    }

    console.log(`Database has been seeded. 🌱`);
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
