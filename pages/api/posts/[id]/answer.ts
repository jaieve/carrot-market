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
    body: { answer },
  } = req;
  // 1. post 정보 찾기
  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!post) res.status(404).json({ ok: false, error: "Not found Post" });

  // 2.
  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: post?.id,
        },
      },
      answer,
    },
  });
  console.log(newAnswer);
  res.json({
    ok: true,
    answer: newAnswer,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
