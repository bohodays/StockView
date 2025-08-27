"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ArrowLeft } from "lucide-react";
import React from "react";

const Page = () => {
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
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">비밀번호 확인</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button full>회원가입</Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default Page;
