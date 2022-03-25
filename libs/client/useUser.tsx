import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

// data를 불러와서 리턴해주는 함수
const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
  const { data, error } = useSWR("/api/users/me", fetcher);
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
