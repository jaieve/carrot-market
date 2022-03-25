import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session);
  // line15에서 핸들러를 도우미함수(withIronSessionApiRoute)로 감싸줬기 때문에 req.sesison확인할 수 있는 것
  const { token } = req.body;
  console.log(token);
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true }, // user가 있다면 user 정보도 같이 가져와준다.
  });
  if (!exists) res.status(400).end();
  /**
   * {
        id: 42,
        payload: '136127',
        createdAt: 2022-03-25T00:22:00.761Z,
        updatedAt: 2022-03-25T00:22:00.766Z,
        userId: 1
      }
   */
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();

  res.status(200).end();
}
export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "eggplantsession",
  password:
    "laugo;anglahfbl;anbl;aug098ahjgkljnafbnal;jt2ojglnclkahgkl2hntklgs",
});
