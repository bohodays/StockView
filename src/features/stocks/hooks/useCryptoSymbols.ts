import { getCryptoSymbols } from "@/lib/api/finnhub";
import { stockKeys } from "@/lib/query/keys";
import { useQuery } from "@tanstack/react-query";

const useCryptoSymbols = (exchange: string) => {
  return useQuery({
    queryKey: stockKeys.symbols(exchange),
    queryFn: () => getCryptoSymbols(exchange),
    enabled: !!exchange, // exchange 없으면 호출 안 함
    staleTime: 60_000, // 1분 동안 신선한 데이터로 취급
    gcTime: 5 * 60_000, // 캐시 유지 시간(뒤로가기 대비)
    refetchOnWindowFocus: false,
  });
};

export default useCryptoSymbols;
