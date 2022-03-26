import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    //
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    const {
      query: { latitude, longitude, page, pageSize },
    } = req;
    const latitudeF = parseFloat(latitude.toString());
    const longitudeF = parseFloat(longitude.toString());
    const posts = await client.post.findMany({
      /* take: parseInt(pageSize.toString()),
      skip: parseInt(pageSize.toString()) * (parseInt(page.toString()) - 1), */
      where: {
        latitude: {
          gte: latitudeF - 0.01,
          lte: latitudeF + 0.01,
        },
        longitude: {
          gte: longitudeF - 0.01,
          lte: longitudeF + 0.01,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonderings: true,
            answers: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      posts,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
