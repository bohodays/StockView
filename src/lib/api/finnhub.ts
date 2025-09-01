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

export { getQuote };
