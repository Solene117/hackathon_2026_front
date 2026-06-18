import { useUserTiresStore } from "../stores/userTiresStore";

export function useUserTires() {
  const tires = useUserTiresStore((state) => state.tires);
  const isLoading = useUserTiresStore((state) => state.isLoading);
  const error = useUserTiresStore((state) => state.error);
  const fetchTires = useUserTiresStore((state) => state.fetchTires);

  return {
    tires,
    isLoading,
    error,
    refresh: () => fetchTires({ force: true }),
  };
}
