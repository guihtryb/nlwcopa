import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.guess.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.game.deleteMany();
  await prisma.user.deleteMany();
  await prisma.poll.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      avatarUrl: 'https://github.com/guihtryb.png',
    }
  });

  const poll = await prisma.poll.create({
    data: {
      title: 'Example Poll',
      code: 'BOL01',
      ownerId: user.id,
      participants: {
        create:
        {
          userId: user.id
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-20T13:00:00.201Z',
      firstTeamCountryCode: 'QA',
      secondTeamCountryCode: 'EC',
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              }
            }
          }
        }
      }
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-21T10:00:00.201Z',
      firstTeamCountryCode: 'GB',
      secondTeamCountryCode: 'IR',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-21T13:00:00.201Z',
      firstTeamCountryCode: 'SN',
      secondTeamCountryCode: 'NL',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-21T13:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'SB',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-21T16:00:00.201Z',
      firstTeamCountryCode: 'US',
      secondTeamCountryCode: 'GB',
    },
  });
}

main()