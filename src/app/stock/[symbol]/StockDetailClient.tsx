"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { SearchBar } from "@/components/common/SearchBar";
import LiveLineChart from "@/features/stocks/components/LiveLineChart";
import useLastPriceLine from "@/features/stocks/hooks/useLastPriceLine";
import { stocksData } from "@/features/stocks/mock/stocksData.mock";
import { ArrowLeft, Star } from "lucide-react";
import React from "react";

const StockDetailClient = ({
  symbol,
}: // initialCandles
{
  symbol: string;
}) => {
  // console.log(symbol);
  const lineQ = useLastPriceLine(symbol);
  // console.log(lineQ.data);

  return (
    <main className="h-full">
      {/* navigation bar */}
      <section>
        <div>
          <NavigationBar
            showLeftButton
            leftButton={<ArrowLeft className="size-6" />}
            showRightButton
            rightButton={<Star className="size-6" />}
            showCenterButton
            centerButton={<SearchBar className="mx-0" />}
          />
        </div>
      </section>

      {/* Live Chart */}
      <section className="py-16">
        <LiveLineChart symbol={symbol} height={300} points={lineQ.data} />
      </section>

      {/* etc functions */}
      <section></section>
    </main>
  );
};

export default StockDetailClient;
