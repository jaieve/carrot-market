import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = req;
  const records = await client.record.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          records: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    kind,
    records,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
