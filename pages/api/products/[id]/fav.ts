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

  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: product?.id,
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    // delete
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // create
    await client.fav.create({
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
