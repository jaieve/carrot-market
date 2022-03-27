import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!product) res.status(404).json({ ok: false, error: "Not found Product" });

  const alreadyExists = await client.record.findFirst({
    where: {
      productId: product?.id,
      userId: user?.id,
      kind: "Fav",
    },
  });
  if (alreadyExists) {
    // delete
    await client.record.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // create
    await client.record.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: product?.id,
          },
        },
        kind: "Fav",
      },
    });
  }
  res.json({
    ok: true,
  });
}
export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
