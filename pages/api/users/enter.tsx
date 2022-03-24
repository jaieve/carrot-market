import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { prisma } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const paylod = phone ? { phone: +phone } : { email };
  /*   const user = await client.user.upsert({
    where: {
      ...paylod,
    },
    create: {
      name: "Anonymous",
      ...paylod,
    },
    update: {},
  }); */
  const token = await client.token.create({
    data: {
      payload: "132123157",
      user: {
        // connect : db에 이미 존재하는 user data와 token을 연결
        // create : 새로운 token을 만들면서 새로운 user 만듦
        // connectOrCreate : User를 찾지 못한다면 새로운 suer 만들어서 token과 연결
        connectOrCreate: {
          where: {
            ...paylod,
          },
          create: {
            name: "Anonymous",
            ...paylod,
          },
        },
      },
    },
  });
  console.log(token);
  /* if (email) {
    user = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) console.log("User find it");
    if (!user) {
      console.log("Did not found. Will create!");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
    // findUnique의 return type : User | null
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone, // +String  => number
      },
    });
    if (user) console.log("User find it");
    if (!user) {
      console.log("Did not found. Will create!");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
    // findUnique의 return type : User | null
  } */
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
