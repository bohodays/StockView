"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { SearchBar } from "@/components/common/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { favoritesList } from "@/features/stocks/mock/favorites.mock";
import { Moon, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

/**
 * 메인 페이지
 */
export default function Home() {
  const { theme, setTheme } = useTheme();

  const onClickDarkMode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

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
                <Sun className="absolute size-6  scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              </>
            }
            onClickLeftButton={onClickDarkMode}
            showRightButton
            rightButton={
              <Link href={"/login"}>
                <UserRound className="size-6" />
              </Link>
            }
          />
        </div>
      </section>

      <section className="min-h-screen w-4/5 mx-auto space-y-32 -translate-y-[var(--navigation-height)] flex flex-col justify-center items-center">
        <div className="w-full space-y-3">
          {/* search bar */}
          <SearchBar className="" />

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
}
