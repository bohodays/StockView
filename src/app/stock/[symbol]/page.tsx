import StockDetailClient from "./StockDetailClient";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: Promise<{ symbol: string }> }) => {
  const { symbol } = await params;

  return <StockDetailClient symbol={decodeURIComponent(symbol)} />;
};

export default Page;
