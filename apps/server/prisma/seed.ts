import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  await prisma.user.upsert({
    where: { email: 'bob@example.com ' },
    update: {},
    create: {
      email: 'bob@example.com',
      password: '$2a$10$xsMibUoSxRaxL7mEY6VUD.jo9xMcDmvBJL57GjTZ8ohDS.UJ96qla',
      name: 'Bob',
    },
  });

  await prisma.user.upsert({
    where: { email: 'marie@example.com ' },
    update: {},
    create: {
      email: 'marie@example.com',
      password: '$2a$10$xsMibUoSxRaxL7mEY6VUD.jo9xMcDmvBJL57GjTZ8ohDS.UJ96qla',
      name: 'Marie',
    },
  });

  // Seed Swimlanes
  const swimlanes: string[] = ['Docked', 'Outbound to Sea', 'Inbound to Harbor', 'Maintenance'];
  for (const [i, swimlane] of swimlanes.entries()) {
    await prisma.swimlane.upsert({
      where: { name: swimlane },
      update: {},
      create: {
        name: swimlane,
        position: i,
      },
    });
  }

  const boats: string[] = Array.from({ length: 8 }, (_, i) => `Boat ${i}`);
  for (const boat of boats) {
    await prisma.boat.upsert({
      where: { name: boat },
      update: {},
      create: {
        name: boat,
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
