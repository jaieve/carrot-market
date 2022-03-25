import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user); // http://localhost:3000/api/users/me/
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    profile,
  });
}
export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "eggplantsession",
  password:
    "laugo;anglahfbl;anbl;aug098ahjgkljnafbnal;jt2ojglnclkahgkl2hntklgs",
});
