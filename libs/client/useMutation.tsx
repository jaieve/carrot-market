import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
interface IUseState {
  loading: boolean;
  data: undefined | any;
  error: undefined | any;
}

type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  // 3개의 state를 사용하지 않고 한개로 사용할 수도 있다.
  const [state, setState] = useState<IUseState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const { loading, data, error } = state;
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<undefined | any>(undefined);
  // const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data: any) {
    // setLoading(true);
    setState({ ...state, loading: true });
    fetch(url, {
      method: "POST", // GET은 만들지 않는다. 추후에 SWR에서 api로부터 GET할 수 있는 utiliy funciton을 제공하는데 그것을 쓸 예정임
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), //data is interface EnterForm
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => setState({ ...state, data: json }))
      .then((error) => setState({ ...state, error: error }))
      .finally(() => setState({ ...state, loading: true }));
  }
  return [mutation, { loading, data, error }];
}
