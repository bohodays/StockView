export const stockKeys = {
  base: ["stock"] as const,
  quote: (s: string) => [...stockKeys.base, "quote", s] as const,
  lastLine: (s: string) => [...stockKeys.base, "last-line", s] as const,
  symbols: (s: string) => [...stockKeys.base, "symbols", s] as const,
};
