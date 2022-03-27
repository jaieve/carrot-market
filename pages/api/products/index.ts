import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import record from "../users/me/record";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const products = await client.product.findMany({
      /* take: parseInt(10),
      skip: parseInt(10), */
      include: {
        user: true,
        records: {
          where: {
            kind: "Fav",
          },
        },
        /*         _count: {
          select: {
            records: true,
          },
        }, */
      },
    });
    products.forEach((product) => {
      let favs = 0;
      let chats = 0; // TODO model Chats 추가되면 수정하기
      product.records.map((record) => {
        favs = favs + Number(record.kind === "Fav");
      });
      const obj = { favs: null, chats: null };
      obj.favs = favs;
      obj.chats = chats;
      product._count = obj;
    });
    res.json({
      ok: true,
      products,
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = req;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true, // products/upload.tsx 에서 data로 전달되는 값
      product,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
