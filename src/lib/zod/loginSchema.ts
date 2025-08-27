import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .pipe(z.email("유효한 이메일 형식이 아닙니다.")),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
