"use client";

import NavigationBar from "@/components/common/NavigationBar";
import { SearchBar } from "@/components/common/SearchBar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LiveLineChart from "@/features/stocks/components/LiveLineChart";
import useLastPriceLine from "@/features/stocks/hooks/useLastPriceLine";
import {
  addFavorite,
  checkExistFavorite,
  deleteFavorite,
} from "@/lib/api/favorite";
import { useAuthStore } from "@/lib/stores/auth";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const StockDetailClient = ({
  symbol,
}: // initialCandles
{
  symbol: string;
}) => {
  const router = useRouter();
  const lineQ = useLastPriceLine(symbol);
  const displayNm = symbol.split(":")[1].replace("USDT", "");
  const { isLogined } = useAuthStore();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false); // AlertDialog 제어 상태
  const favoritedId = useRef<string>(null);

  // 현재의 코인이 즐겨찾기 되었는지 확인하는 메서드
  const onCheckFavorite = async (symbol: string) => {
    const res = await checkExistFavorite(symbol);
    if (res.status === "exists") {
      setIsFavorited(true);
      if (res.data) {
        favoritedId.current = res.data.id;
      }
    } else setIsFavorited(false);
    console.log({ res });
    return res;
  };

  // 즐겨찾기 버튼의 이벤트 핸들러
  const onClickFavoriteButton = async () => {
    // 즐겨찾기 되어있으면 즐겨찾기 삭제
    if (isFavorited) {
      if (favoritedId.current) {
        const { status, statusCd } = await deleteFavorite(favoritedId.current);
        console.log({ status, statusCd });
        if (statusCd === "S") {
          setIsFavorited(false);
        }
      }
    }
    // 즐겨찾기 되어있지 않으면 즐겨찾기 추가
    else {
      const { status, statusCd, data } = await addFavorite(symbol);
      console.log(statusCd);
      if (statusCd === "S") {
        setIsFavorited(true);
      } else if (statusCd === "M") {
        toast.error("즐겨찾기는 최대 20종목까지 가능합니다.");
      }
    }
  };

  const onMoveLoginPage = () => {
    setShowLoginAlert(true);
  };

  useEffect(() => {
    if (isLogined) {
      onCheckFavorite(symbol);
    }
  }, []);

  return (
    <main className="h-full">
      {/* navigation bar */}
      <section>
        <div>
          <NavigationBar
            showLeftButton
            leftButton={<ArrowLeft className="size-6" />}
            onClickLeftButton={() => router.push("/")}
            showRightButton
            rightButton={
              <Star
                className="size-6"
                fill={isFavorited ? "currentColor" : "none"}
              />
            }
            onClickRightButton={
              isLogined ? onClickFavoriteButton : onMoveLoginPage
            }
            showCenterButton
            centerButton={<SearchBar className="mx-0" />}
          />
        </div>
      </section>

      {/* Live Chart */}
      <section className="py-28 w-4/5 mx-auto ">
        <h1 className="text-2xl">{displayNm}</h1>
        <h2 className="text-xl">
          {`${new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(lineQ.data[lineQ.data.length - 1]?.value ?? 0)}` + " USDT"}
        </h2>
        <LiveLineChart symbol={symbol} height={300} points={lineQ.data} />
      </section>

      {/* etc functions */}
      <section></section>

      {/* AlertDialog */}
      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              즐겨찾기 기능은 로그인이 필요합니다. 로그인 페이지로
              이동하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/login")}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default StockDetailClient;
