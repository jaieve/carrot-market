import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter");
          // 이전 페이지를 히스토리에 남기고 싶지 않다면 replce를 사용.
          // 남기고 싶다면 push 사용
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
}
