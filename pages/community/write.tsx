import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import Router, { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  question: string;
}
interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { latitude, longitude } = useCoords();
  // 3. 백엔드와 통신하는 mutation 연결. post는 새로 만들어진 post에 대한 response
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
  const { register, handleSubmit } = useForm<WriteForm>();
  // 1. handleSubmit은 form에 담긴 데이터가 유효하면 onValid를 호출하는 함수를 return 한다.
  // 2. form의 멤버인 TextARea에 register prop을 부여한다.
  const onValid = (data: WriteForm) => {
    // console.log(data); // 개발자도구에서 확인
    if (loading) return;
    //만약 로딩중이라면 유저가 여러번 클릭하는 것 방지
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 p-4">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="Ask a question!"
        />
        <Button isLoading={loading} text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
