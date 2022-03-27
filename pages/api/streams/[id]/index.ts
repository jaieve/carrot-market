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
  var stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  const isOwner = stream?.userId == user?.id;
  if (!isOwner) {
    delete stream?.cloudflareKey;
    delete stream?.cloudflareUrl;
  }
  res.json({
    ok: true,
    stream: stream,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
