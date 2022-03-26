import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { userInfo } from "os";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        take: parseInt(10),
        skip: parseInt(0),
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wonderings: true,
        },
      },
    },
  });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: +id.toString(),
        userId: user.id,
      },
      select: {
        id: true,
      },
    })
  );
  if (!post) res.json({ ok: false, error: "Not Found Post" });
  res.json({
    ok: true,
    post, // 만약 해당 id의 post가 없다면 null이 반환될 것이다. 반환된 페이지에서 404 not found 처리를 해줘야 한다.
    isWondering,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
