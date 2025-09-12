import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { UTCTimestamp } from "lightweight-charts";

dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Finnhub quote API의 timestamp(t, 초 단위)를
 * 한국 시간(KST) 문자열로 변환
 */
export function formatFinnhubTime(t: number): string {
  return dayjs.unix(t).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 공용헬퍼
 */
export const toSec = (ms: number) => Math.floor(ms / 1000) as UTCTimestamp;

/**
 * symbol의 format을 맞추어 사용자에게 보여주기 위한 유틸 함수
 * ex) "BINANCE:BTCUSDT" -> "BTC"
 */
export const formatSymbol = (symbol: string) => {
  const splittedSymbol = symbol.split(":")[1].replace("USDT", "");
  return splittedSymbol;
};
