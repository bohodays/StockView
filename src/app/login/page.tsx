"use client";

import NavigationBar from "@/components/common/NavigationBar";
import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LoginSchema, loginSchema } from "@/lib/zod/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { selectUserInfo, signInWithEmail } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupSuccess = searchParams.get("signup");
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    const { email, password } = data;
    const { data: loginData, error } = await signInWithEmail(email, password);

    if (error) {
      if (error.code === "invalid_login_credentials") {
        toast.error(
          "이메일 또는 비밀번호가 올바르지 않아요. 다시 확인해주세요."
        );
      } else {
        toast.error("문제가 발생했어요. 잠시 후 다시 시도해주세요.");
      }
    } else {
      if (loginData.user) {
        const { data: userInfo, error } = await selectUserInfo(
          loginData.user.id
        );

        if (error) {
          toast.error("문제가 발생했어요. 잠시 후 다시 시도해주세요.");
        } else {
          setAuth(loginData?.user?.email ?? "", userInfo?.nickname);
          router.push("/?login=success");
        }
      }
    }
  };

  useEffect(() => {
    if (signupSuccess === "success") {
      toast.success("회원가입이 완료되었습니다. 로그인 해주세요.");
    }
  }, [signupSuccess]);

  return (
    <main className="h-full">
      {/* navigation bar */}
      <section>
        <div>
          <NavigationBar
            showLeftButton
            leftButton={
              // <Link href={"/"}>
              <ArrowLeft className="size-6" />
              // </Link>
            }
            onClickLeftButton={() => {
              alert("tt");
              console.log("clicked");
            }}
          />
        </div>
      </section>

      {/* login form */}
      <section className="min-h-screen w-4/5 mx-auto space-y-32 -translate-y-[var(--navigation-height)] flex flex-col justify-center items-center ">
        <Card className="w-full shadow-md">
          <CardContent>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">비밀번호</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                </div>
              </div>
              <CardFooter className="flex flex-col space-y-4  mt-6 px-0">
                <Button full type="submit">
                  로그인
                </Button>
                <p className="text-xs">
                  {"아직 Stock View 회원이 아닌가요?"}
                  <Link
                    className="underline underline-offset-4 text-[var(--color-peach)] px-2"
                    href={"/signup"}
                  >
                    가입하기
                  </Link>
                </p>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Page;
