import NavigationBar from "@/components/common/NavigationBar";
import { SearchBar } from "@/components/common/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Moon, Sun, UserRound } from "lucide-react";

export default function Home() {
  return (
    <main className="h-full">
      <section>
        {/* navigation bar */}
        <div>
          <NavigationBar
            showLeftButton
            leftButton={
              <Sun className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            }
            showRightButton
            rightButton={<UserRound className="size-6" />}
          />
        </div>
      </section>

      <section className="min-h-screen w-4/5 mx-auto space-y-32 -translate-y-[var(--navigation-height)] flex flex-col justify-center items-center">
        <div className="w-full space-y-3">
          {/* search bar */}
          <SearchBar className="" />

          {/* favorites */}
          <div className="w-full flex flex-wrap gap-2">
            <Badge
              className="bg-blue-500 text-white dark:bg-blue-600"
              variant="secondary"
            >
              {"# 애플"}
            </Badge>
            <Badge
              className="bg-blue-500 text-white dark:bg-blue-600"
              variant="secondary"
            >
              {"# 로켓랩"}
            </Badge>
            <Badge
              className="bg-blue-500 text-white dark:bg-blue-600"
              variant="secondary"
            >
              {"# 테슬라"}
            </Badge>
            <Badge
              className="bg-blue-500 text-white dark:bg-blue-600"
              variant="secondary"
            >
              {"# 구글"}
            </Badge>
            <Badge
              className="bg-blue-500 text-white dark:bg-blue-600"
              variant="secondary"
            >
              {"# 테슬라"}
            </Badge>
            <Badge
              className="bg-blue-500 text-white dark:bg-blue-600"
              variant="secondary"
            >
              {"# 구글"}
            </Badge>
            <Badge
              className="bg-blue-500 text-white dark:bg-blue-600"
              variant="secondary"
            >
              {"# 테슬라"}
            </Badge>
            <Badge
              className="bg-blue-500 text-white dark:bg-blue-600"
              variant="secondary"
            >
              {"# 구글"}
            </Badge>
            <Badge className="bg-emerald-500 text-white dark:bg-emerald-600">
              # 애플
            </Badge>
            <Badge className="bg-amber-500 text-white dark:bg-amber-600">
              # 로켓랩
            </Badge>
            <Badge className="bg-violet-500 text-white dark:bg-violet-600">
              # 테슬라
            </Badge>
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
