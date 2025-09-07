"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { SearchBar } from "@/components/common/SearchBar";
import LiveLineChart from "@/features/stocks/components/LiveLineChart";
import useLastPriceLine from "@/features/stocks/hooks/useLastPriceLine";
import { stocksData } from "@/features/stocks/mock/stocksData.mock";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const StockDetailClient = ({
  symbol,
}: // initialCandles
{
  symbol: string;
}) => {
  const router = useRouter();
  const lineQ = useLastPriceLine(symbol);
  const displayNm = symbol.split(":")[1].replace("USDT", "");

  return (
    <main className="h-full">
      {/* navigation bar */}
      <section>
        <div>
          <NavigationBar
            showLeftButton
            leftButton={<ArrowLeft className="size-6" />}
            onClickLeftButton={() => router.push("/")}
            showRightButton
            rightButton={<Star className="size-6" />}
            showCenterButton
            centerButton={<SearchBar className="mx-0" />}
          />
        </div>
      </section>

      {/* Live Chart */}
      <section className="py-28 w-4/5 mx-auto ">
        <h1 className="text-2xl">{displayNm}</h1>
        <h2 className="text-xl">
          {`${new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(lineQ.data[lineQ.data.length - 1]?.value ?? 0)}` + " USDT"}
        </h2>
        <LiveLineChart symbol={symbol} height={300} points={lineQ.data} />
      </section>

      {/* etc functions */}
      <section></section>
    </main>
  );
};

export default StockDetailClient;
