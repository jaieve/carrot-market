import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(401).end();
  }
  // req.body는 req의 인코딩을 기준으로 인코딩된다.
  // resolve : fetch 보낼 때 ehader에 content-type 추가
  console.log(req.body.email);
  res.status(200).end();
}
// test url : http://localhost:3000/api/client-test
