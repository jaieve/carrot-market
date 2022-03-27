import { ProductWithCount } from "pages";
import useSWR from "swr";
import Item from "./item";

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

interface ProductListProps {
  kind: "Fav" | "Sale" | "Purchase";
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(
    `/api/users/me/record?kind=${kind}`
  );
  console.log(data);
  return data ? (
    <>
      {data?.records?.map((record) => (
        <Item
          key={record?.id}
          id={record?.product.id}
          title={record?.product.name}
          image={record?.product.image}
          price={record?.product.price}
          hearts={record?.product._count?.favs}
          comments={null}
        />
      ))}
    </>
  ) : null;
}
