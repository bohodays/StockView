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
} from "lightweight-charts";

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

  console.log(points);

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
      },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      crosshair: { mode: CrosshairMode.Normal },
    });
    chartRef.current = chart;

    const series = chart.addSeries(LineSeries, { priceLineVisible: false });
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
      <div className="mb-2 text-sm text-muted-foreground">
        {symbol} (Last Price • Live)
      </div>
      <div ref={hostRef} className="w-full" />
    </div>
  );
}
