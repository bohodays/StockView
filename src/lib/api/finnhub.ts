import { CryptoSymbolType } from "@/features/stocks/types/symbol";

/**
 * 특정 symbol의 현재 주식 가격을 조회하는 API
 * 초기 스냅샷을 위해 활용함
 * @param symbol
 * @returns
 */
const getQuote = async (symbol: string) => {
  const response = await fetch(`/api/finnhub/quote?symbol=${symbol}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  return response.json() as Promise<any>;
};

/**
 * 특정 거래소의 코인 symbol 목록을 조회하는 API
 * @param exchange
 * @returns
 */
const getCryptoSymbols = async (exchange: string) => {
  const response = await fetch(`/api/finnhub/crypto?exchange=${exchange}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch crypro symbols");
  }

  return response.json() as Promise<CryptoSymbolType[]>;
};

export { getQuote, getCryptoSymbols };
