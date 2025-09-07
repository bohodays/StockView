import { LineData, UTCTimestamp } from "lightweight-charts";

const stocksData: LineData[] = [
  { time: (Date.now() / 1000 - 600 * 9) as UTCTimestamp, value: 150 },
  { time: (Date.now() / 1000 - 600 * 8) as UTCTimestamp, value: 152 },
  { time: (Date.now() / 1000 - 600 * 7) as UTCTimestamp, value: 149 },
  { time: (Date.now() / 1000 - 600 * 6) as UTCTimestamp, value: 153 },
  { time: (Date.now() / 1000 - 600 * 5) as UTCTimestamp, value: 155 },
  { time: (Date.now() / 1000 - 600 * 4) as UTCTimestamp, value: 154 },
  { time: (Date.now() / 1000 - 600 * 3) as UTCTimestamp, value: 158 },
  { time: (Date.now() / 1000 - 600 * 2) as UTCTimestamp, value: 160 },
  { time: (Date.now() / 1000 - 600 * 1) as UTCTimestamp, value: 162 },
  { time: (Date.now() / 1000) as UTCTimestamp, value: 161 },
];

export { stocksData };
