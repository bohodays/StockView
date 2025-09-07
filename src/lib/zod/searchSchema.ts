import { z } from "zod";

export const searchSchema = z.object({
  searchValue: z.string().min(1, "검색할 코인을 입력해주세요."),
});

export type SearchSchema = z.infer<typeof searchSchema>;
