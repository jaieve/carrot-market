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
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_API_STREAM}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
        }
      )
    ).json();
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        cloudflareId: uid,
        cloudflareUrl: url,
        cloudflareKey: streamKey,
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
