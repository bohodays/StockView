import { z } from "zod";

export const signupSchema = z
  .object({
    nickname: z
      .string()
      .min(1, "닉네임은 최소 1자 이상이어야 합니다.")
      .max(16, "닉네임은 최대 16자까지 입력할 수 있습니다."),
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .pipe(z.email("유효한 이메일 형식이 아닙니다.")),
    password: z
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 입력할 수 있습니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).+$/,
        "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
