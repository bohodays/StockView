import LiveLineChart from "@/features/stocks/components/LiveLineChart";
import { UTCTimestamp } from "lightweight-charts";
import StockDetailClient from "./StockDetailClient";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { symbol: string } }) => {
  const { symbol } = await params;

  console.log("페이지", { symbol });

  return <StockDetailClient symbol={`BINANCE:${symbol}USDT`} />;
};

export default Page;
