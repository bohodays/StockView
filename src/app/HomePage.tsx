"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { SearchBar } from "@/components/common/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { favoritesList } from "@/features/stocks/mock/favorites.mock";
import { useAuthStore } from "@/lib/stores/auth";
import { SearchSchema, searchSchema } from "@/lib/zod/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Moon, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const HomePage = ({ loginStatus }: { loginStatus?: string }) => {
  const { theme, setTheme } = useTheme();
  const { isLogined } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const onClickDarkMode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const onSubmit = async (data: SearchSchema) => {
    const { searchValue } = data;
    if (searchValue) {
      router.push(`/stock/${searchValue.toUpperCase()}`);
    }
  };

  useEffect(() => {
    console.log({ isLogined });

    if (loginStatus === "success") {
      toast.success("로그인에 성공했습니다.");

      // URL에서 ?login=success 제거
      const newUrl = window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [loginStatus]);

  useEffect(() => {
    if (errors.searchValue?.type === "too_small") {
      toast.error(errors.searchValue.message);
    }
  }, [errors]);

  return (
    <main className="h-full">
      <section>
        {/* navigation bar */}
        <div>
          <NavigationBar
            showLeftButton
            leftButton={
              <>
                <Moon className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 " />
                <Sun className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              </>
            }
            onClickLeftButton={onClickDarkMode}
            showRightButton
            rightButton={
              <Link href={isLogined ? "/my" : "/login"}>
                <UserRound className="size-6" />
              </Link>
            }
          />
        </div>
      </section>

      <section className="min-h-[100dvh] w-4/5 mx-auto space-y-32 py-[var(--navigation-height)] flex flex-col justify-center items-center">
        <div className="w-full space-y-3">
          {/* search bar */}
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <SearchBar
              className=""
              id="searchValue"
              placeholder="검색할 코인을 입력해주세요."
              {...register("searchValue")}
            />
          </form>

          {/* favorites */}
          <div className="w-full flex flex-wrap gap-2">
            {favoritesList.map((item) => (
              <Badge
                key={item.id}
                className="bg-blue-500 text-white dark:bg-blue-600"
                variant="secondary"
              >
                {`# ${item.title}`}
              </Badge>
            ))}
          </div>
        </div>

        {/* news */}
        <div className="w-4/5 h-[200px] bg-[var(--secondary)] flex justify-center items-center">
          news
        </div>
      </section>
    </main>
  );
};

export default HomePage;
