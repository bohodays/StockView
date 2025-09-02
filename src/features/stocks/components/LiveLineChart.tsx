"use client";

import React, { useEffect, useRef } from "react";
import {
  createChart,
  LineSeries, // ✅ v5: 시리즈 정의 가져오기
  type IChartApi,
  type ISeriesApi,
  type LineData,
  CrosshairMode,
  ColorType,
  UTCTimestamp,
  Time,
  TickMarkType,
} from "lightweight-charts";
import dayjs from "dayjs";

export default function LiveLineChart({
  symbol,
  points,
  height = 220,
}: {
  symbol: string;
  points: LineData[];
  height?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  console.log({ symbol });

  useEffect(() => {
    if (!hostRef.current) return;

    const chart = createChart(hostRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" }, // ✅ enum 사용
      },
      rightPriceScale: { borderVisible: false },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (
          time: Time,
          tickMarkType: TickMarkType,
          local: string
        ) => {
          return dayjs
            .unix(Number(time))
            .tz("Asia/Seoul")
            .format("MM-DD HH:mm");
        },
      },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      crosshair: { mode: CrosshairMode.Normal },
    });
    chartRef.current = chart;

    const series = chart.addSeries(LineSeries, {
      priceLineVisible: false,
      priceFormat: {
        type: "custom",
        formatter: (price: number) => {
          // 반드시 문자열을 return 해야 함!
          return new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 2,
          }).format(price);
        },
      },
    });
    seriesRef.current = series;

    const resize = () => {
      if (!hostRef.current) return;
      chart.applyOptions({ width: hostRef.current.clientWidth });
    };
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!seriesRef.current) return;
    const data: LineData[] = (points ?? []) as LineData[];
    seriesRef.current.setData(data);
  }, [points]);

  return (
    <div>
      <div ref={hostRef} className="w-full" />
    </div>
  );
}
