import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // 채팅의 미들웨어
  console.log("chats only middleware");
}
