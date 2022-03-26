import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { ok } from "assert";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
    query: { page, pageSize },
  } = req;
  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      // back = front - 1
      // pageSize = 10

      // take : pageSize
      // skip : back * pageSize
      take: Number(pageSize),
      skip: Number(pageSize) * (Number(page) - 1),
    });
    res.json({
      ok: true,
      streams,
    });
  }
  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
