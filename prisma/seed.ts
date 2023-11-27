import { faker } from '@faker-js/faker';
import { type Interaction, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
// @ts-ignore
const chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr];
    if (chunkSize <= 0) return cache;
    // @ts-ignore
    while (tmp.length) cache.push(tmp.splice(0, chunkSize));
    return cache;
};

async function seed() {
    // Wipe the db clean...
    await prisma.user.deleteMany({});
    await prisma.company.deleteMany({});
    await prisma.interaction.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.case.deleteMany({});
    await prisma.comment.deleteMany({});

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
    for await (const x of [...Array(3)]) {
        const company = await prisma.company.create({
            data: {
                name: faker.company.name()
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const y of [...Array(3)]) {
            await prisma.customer.create({
                data: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    companies: {
                        connect: [{ id: company.id }]
                    },
                    interactions: {
                        createMany: {
                            data: [...Array(3)].map(() => {
                                return {
                                    userId: user.id,
                                    title: faker.word.words({
                                        count: { min: 1, max: 4 }
                                    }),
                                    description: faker.word.words({
                                        count: { min: 100, max: 500 }
                                    }),
                                    type: 'EMAIL'
                                };
                            })
                        }
                    }
                }
            });
        }

        const allInteractions = await prisma.interaction.findMany({});
        const chunkedInteractions = chunk(allInteractions, 3);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const chunkOfInteractions of chunkedInteractions) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            await prisma.case.create({
                data: {
                    title: faker.color.human(),
                    description: faker.word.words({
                        count: { min: 100, max: 500 }
                    }),
                    companies: {
                        connect: [{ id: company.id }]
                    },
                    userId: user.id,
                    interactions: {
                        connect: (chunkOfInteractions as Interaction[]).map(
                            (interaction) => ({
                                id: interaction.id
                            })
                        )
                    },
                    comments: {
                        create: [...Array(5)].map(() => ({
                            userId: user.id,
                            text: faker.word.words({
                                count: { min: 100, max: 500 }
                            })
                        }))
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
