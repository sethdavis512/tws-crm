import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    // Clear tables...
    await prisma.company.deleteMany({}).catch(() => {});
    await prisma.interaction.deleteMany({}).catch(() => {});
    await prisma.customer.deleteMany({}).catch(() => {});
    await prisma.case.deleteMany({}).catch(() => {});

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const x of [...Array(30)]) {
        await prisma.company.create({
            data: {
                name: faker.company.name()
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // for await (const y of [...Array(3)]) {
        //     await prisma.customer.create({
        //         data: {
        //             firstName: faker.person.firstName(),
        //             lastName: faker.person.lastName(),
        //             companies: {
        //                 connect: [{ id: company.id }]
        //             },
        //             interactions: {
        //                 createMany: {
        //                     data: [...Array(3)].map(() => {
        //                         return {
        //                             title: faker.word.words({
        //                                 count: { min: 1, max: 4 }
        //                             }),
        //                             description: faker.word.words({
        //                                 count: { min: 100, max: 500 }
        //                             }),
        //                             type: 'EMAIL'
        //                         };
        //                     })
        //                 }
        //             }
        //         }
        //     });
        // }
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
