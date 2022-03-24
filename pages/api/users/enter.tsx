import withHandler from "@libs/server/withHandler";
//import withHandler from "../../../libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  return res.status(200).end();
  // req.body는 req의 인코딩을 기준으로 인코딩된다.
  // resolve : fetch 보낼 때 ehader에 content-type 추가
}
// test url : http://localhost:3000/api/client-test

export default withHandler("POST", handler);

// 1. phone # ---> User?
// 2. token^User  #randomNumber
// 3. #randomNumber --> SMS --> phone #(Twilio)
// 4. (after get tocken) show input#tocken at view
// 5. submit : #randomNumber --> Token?^User ---> Log the user
