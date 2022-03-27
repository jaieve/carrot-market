import { PrismaClient } from "@prisma/client";
// Now, This place is outside of NextJS

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    const stream = await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        cloudflareId: String(item),
        cloudflareUrl: String(item),
        cloudflareKey: String(item),
        user: {
          connect: {
            id: 3,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
