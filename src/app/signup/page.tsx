"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { signupSchema, SignupSchema } from "@/lib/zod/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupSchema) => {
    console.log("회원가입 데이터", { data });
  };

  return (
    <main>
      {/* navigation bar */}
      <section>
        <div>
          <NavigationBar
            showLeftButton
            leftButton={<ArrowLeft className="size-6 cursor-pointer" />}
            onClickLeftButton={() => {
              console.log("clicked");
            }}
          />
        </div>
      </section>

      {/* signup form */}
      <section className="min-h-screen w-4/5 mx-auto space-y-32 -translate-y-[var(--navigation-height)] flex flex-col justify-center items-center ">
        <Card className="w-full shadow-md">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">비밀번호 확인</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <CardFooter className="flex flex-col space-y-4 mt-6">
                <Button full type="submit">
                  회원가입
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Page;
