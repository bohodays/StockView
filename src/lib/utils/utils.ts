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

// 공용 헬퍼
export const toSec = (ms: number) => Math.floor(ms / 1000) as UTCTimestamp;
