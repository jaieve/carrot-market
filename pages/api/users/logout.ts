import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { withIronSessionApiRoute } from "iron-session/next";
import { useRouter } from "next/router";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const router = useRouter();
  console.log("session: ", req.session);
  const {
    session: {
      user: { id },
    },
  } = req;
  const isUser = await client.user.findUnique({
    where: {
      id,
    },
  });
  if (!isUser) res.json({ ok: false });
  await req.session.destroy;
  router.replace("/");
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
