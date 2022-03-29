import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.ua?.isBot) {
    return new Response("Plz don't be a bot. Be human", { status: 403 });
  }
  console.log(req.url);
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.eggplantsession) {
      // url이 enter가 아니고, 세션에 쿠키가 없다면
      // POST '/api/users/enter ' 의 경우에도 /enter로 redirect 되는 오류는?
      // /api 를 포함하지 않는 조건으로 감싸주기
      return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
  }
}
