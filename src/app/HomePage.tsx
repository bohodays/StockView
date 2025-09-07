"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { SearchBar } from "@/components/common/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useCryptoSymbols from "@/features/stocks/hooks/useCryptoSymbols";
import { favoritesList } from "@/features/stocks/mock/favorites.mock";
import { CryptoSymbolType } from "@/features/stocks/types/symbol";
import { useAuthStore } from "@/lib/stores/auth";
import { SearchSchema, searchSchema } from "@/lib/zod/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Moon, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const HomePage = ({ loginStatus }: { loginStatus?: string }) => {
  const { theme, setTheme } = useTheme();
  const { isLogined } = useAuthStore();
  const {
    data: symbolList,
    isLoading,
    error,
    refetch,
  } = useCryptoSymbols("BINANCE");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  /**
   * 다크모드 버튼 클릭 이벤트 핸들러
   */
  const onClickDarkMode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const onSearchFormatter = (searchValue: string) => {
    return `BINANCE:${searchValue}USDT`;
  };

  /**
   * 코인 검색 이벤트 핸들러
   */
  const onSubmit = async (data: SearchSchema) => {
    const { searchValue } = data;
    if (searchValue) {
      router.push(
        `/stock/${encodeURIComponent(
          onSearchFormatter(searchValue.toUpperCase())
        )}`
      );
    }
  };

  /**
   * 코인 리스트의 아이템 버튼 클릭 이벤트 핸들러
   */
  const onClickSymbol = ({ symbol }: Pick<CryptoSymbolType, "symbol">) => {
    if (symbol) {
      router.push(`/stock/${encodeURIComponent(symbol.toUpperCase())}`);
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
    <main className="h-dvh overflow-hidden">
      {" "}
      {/* 창 높이를 꽉 채우고 윈도우 스크롤 차단 */}
      {/* navigation bar */}
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
      {/* 스크롤 영역: 네비 높이를 뺀 나머지 높이로 고정 */}
      <ScrollArea className="mt-[var(--navigation-height)] h-[calc(100dvh-var(--navigation-height))] md:h-[calc(100dvh-var(--navigation-height))]">
        <section className="w-4/5 mx-auto space-y-32 py-6 flex flex-col justify-center items-center">
          <div className="w-full space-y-3">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <SearchBar
                id="searchValue"
                placeholder="검색할 코인을 입력해주세요."
                {...register("searchValue")}
              />
            </form>

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
        </section>

        {/* 코인 목록 */}
        <section className="w-4/5 mx-auto space-y-32 py-6 flex flex-col justify-center items-center">
          <div>
            {symbolList?.map(
              ({ symbol, displaySymbol, description }, index) => (
                <Fragment key={`${symbol}-${index}`}>
                  <Button
                    variant={"ghost"}
                    full
                    className="justify-between"
                    onClick={() => onClickSymbol({ symbol })}
                  >
                    <div>{displaySymbol}</div>
                    <div>{description}</div>
                  </Button>
                  {index !== symbolList.length && <Separator />}
                </Fragment>
              )
            )}
          </div>
        </section>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
