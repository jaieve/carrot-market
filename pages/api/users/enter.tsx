import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  return res.status(200).end();
  // req.body는 req의 인코딩을 기준으로 인코딩된다.
  // resolve : fetch 보낼 때 ehader에 content-type 추가
}
// test url : http://localhost:3000/api/client-test

export default withHandler("POST", handler);
