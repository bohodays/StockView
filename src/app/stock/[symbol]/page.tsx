import LiveLineChart from "@/features/stocks/components/LiveLineChart";
import { UTCTimestamp } from "lightweight-charts";
import StockDetailClient from "./StockDetailClient";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { symbol: string } }) => {
  let { symbol } = await params;

  return <StockDetailClient symbol={decodeURIComponent(symbol)} />;
};

export default Page;
