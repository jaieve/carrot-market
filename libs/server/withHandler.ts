// view를 handle하는 역할

import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

//function 에 export default를 하지 않으면 누군가 api에 접속했을 때 nextJS에 의해 호출되지 않는다.
// return함으로써 nextJS에서 실행된다.
// 어떤 코드를 짜든 return값은 nextJS가 실행할 function이어야 한다.
export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  // this is a funciton which nextJS run
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
