import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { prisma } from "@prisma/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(10000 + Math.random() * 90000) + ""; // + "" 는 숫자가 문자열이 된다.
  const token = await client.token.create({
    data: {
      payload,
      user: {
        // connect : db에 이미 존재하는 user data와 token을 연결
        // create : 새로운 token을 만들면서 새로운 user 만듦
        // connectOrCreate : User를 찾지 못한다면 새로운 suer 만들어서 token과 연결
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
