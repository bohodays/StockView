"use client";

import NavigationBar from "@/components/common/NavigationBar";
import React from "react";
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

const Page = () => {
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
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">비밀번호</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button full>로그인</Button>
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
        </Card>
      </section>
    </main>
  );
};

export default Page;
