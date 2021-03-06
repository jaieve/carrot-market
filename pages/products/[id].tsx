import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import Image from "next/image";

interface ProductWithUser extends Product {
  user: User;
}
interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser(); // 로그아웃된 상태라면 /enter 페이지로 redirect
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`); // return array
  const onFavClick = () => {
    if (!data) return;
    /*
    @first : 유저에게 화면UI의 변경사항을 보여주기 위한 부분. 원하는 어떤 데이터 형식이든 넣을 수 있다.
    @second : 변경이 일어난 후에 다시 API에서 데이터를 불러올지를 결정하는 boolean
    */
    boundMutate((prev) => prev && { ...prev, isLiked: !data.isLiked }, false);
    // 함수의 인자(prev)로 기존의 캐시에 있던 데이터를 받을 수 있다.
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    toggleFav({}); /// {} 라고 빈 객체를 넣어주면 body가 비어있는 post요청이 된다. 문제는 없음
  };

  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className=" mb-8">
          <div className="relative pb-96">
            <Image
              layout="fill"
              className="bg-slate-300 object-cover"
              src={`https://imagedelivery.net/Jbn0son-X4aW02A0_gVqgA/${data?.product?.image}/public`}
            />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 border-t border-b py-3">
            <Image
              src={`https://imagedelivery.net/Jbn0son-X4aW02A0_gVqgA/${data?.product?.user?.avatar}/avatar`}
              className="h-12 w-12 rounded-full bg-slate-300"
              width={48}
              height={48}
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="mt-3 block text-2xl text-gray-900">
              ￦{data?.product?.price.toLocaleString("ko-KR")}
            </span>
            <p className=" my-6 text-gray-700">{data?.product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                className={cls(
                  "flex items-center justify-center rounded-md p-3 hover:bg-gray-100 ",
                  data?.isLiked
                    ? "text-red-500  hover:text-red-600"
                    : "text-gray-400  hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts?.map((product) => (
              <Link key={product?.id} href={`/products/${product?.id}`}>
                <a>
                  <div>
                    <div className="relative mb-4 h-56 w-full rounded-md bg-slate-300 shadow-sm">
                      <Image
                        layout="fill"
                        className="rounded-md shadow-sm"
                        src={`https://imagedelivery.net/Jbn0son-X4aW02A0_gVqgA/${product?.image}/public`}
                      ></Image>
                    </div>
                    <h3 className="-mb-1 text-gray-700">{product?.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      ${product?.price}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
