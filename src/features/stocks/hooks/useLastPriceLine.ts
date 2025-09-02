"use client";

import { getQuote } from "@/lib/api/finnhub";
import { FinnhubWS } from "@/lib/api/ws-client";
import { stockKeys } from "@/lib/query/keys";
import { formatFinnhubTime, toSec } from "@/lib/utils/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef } from "react";

type LinePoint = {
  time: UTCTimestamp;
  value: number;
};

const useLastPriceLine = (symbol: string, maxPoints = 600) => {
  const qc = useQueryClient();

  // 초기 데이터
  const lineQ = useQuery({
    queryKey: stockKeys.lastLine(symbol),
    queryFn: async () => {
      const q = await getQuote(symbol);
      const tSec = q.t;
      const price = q?.c;
      return price && tSec
        ? ([{ time: tSec, value: price }] as LinePoint[])
        : [];
    },
    refetchOnWindowFocus: false,
    initialData: [] as LinePoint[],
    experimental_prefetchInRender: true,
  });

  const wsRef = useRef<FinnhubWS>(null);

  useEffect(() => {
    const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY!;
    if (!FINNHUB_API_KEY) return;

    const ws = new FinnhubWS(FINNHUB_API_KEY);
    wsRef.current = ws;

    console.log("[WS] connect()");
    ws.connect();

    console.log("[WS] subscribe", symbol);
    ws.subscribe(symbol);

    // rAF로 프레임당 1회만 반영
    let raf = 0;
    let pending: LinePoint | null = null;

    const flush = () => {
      if (pending) {
        qc.setQueryData<LinePoint[]>(
          stockKeys.lastLine(symbol),
          (prev: any = []) => {
            const next = prev.slice();
            const point = pending!;

            const last = next[next.length - 1];
            if (!last) {
              next.push(point);
            } else if (point.time > last.time) {
              next.push(point); // 정상 증가
            } else if (point.time === last.time) {
              next[next.length - 1] = point; // 같은 초 → 교체
            } // point.time < last.time → 드랍 (아무 것도 하지 않음)

            if (next.length > maxPoints)
              next.splice(0, next.length - maxPoints);
            return next;
          }
        );
      }
      pending = null;
      raf = 0;
    };

    const off = ws.onMessage((msg) => {
      if (msg?.type === "last" && Array.isArray(msg.data)) {
        console.log("훅", { symbol });
        const trades = msg.data.filter((d: any) => d.s === symbol);
        if (!trades.length) return;

        // 마지막 체결
        const last = trades[trades.length - 1];
        const p = last.p as number;
        const tSec = toSec(last.t as number);

        pending = { time: tSec, value: p };
        if (!raf) raf = requestAnimationFrame(flush);
        return;
      }

      // 혹시 서버가 trade만 주는 경우(백업): 가장 마지막 trade를 최신가로 사용
      if (msg?.type === "trade" && Array.isArray(msg.data)) {
        const trades = msg.data.filter((d: any) => d.s === symbol);
        console.log("훅", { symbol });
        if (!trades.length) return;

        // 마지막 체결
        const last = trades[trades.length - 1];
        const p = last.p as number;
        const tSec = toSec(last.t as number);

        pending = { time: tSec, value: p };
        if (!raf) raf = requestAnimationFrame(flush);
        return;
      }
    });

    return () => {
      off();
      ws.unsubscribe(symbol);
      ws.destroy();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [symbol, qc, maxPoints]);

  return lineQ;
};

export default useLastPriceLine;
