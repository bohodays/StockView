import { supabase } from "../supabase/client";

/**
 * 사용자의 즐겨찾기 목록을 가져오는 APi
 */
export const getFavorites = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인 필요");

  const { data, error } = await supabase
    .from("favorite")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }); // 최신순 정렬

  if (error) throw error;
  return data;
};

/**
 * 사용자의 즐겨찾기를 추가하는 API
 * @param symbol
 * @returns
 */
export const addFavorite = async (symbol: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인 필요");

  // 사용자의 즐겨찾기 개수를 조회하여 20개 미만이면 추가하고, 20개 이상이면 추가 불가능
  const { data: favoriteList = [], error: selectError } = await supabase
    .from("favorite")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }); // 최신순 정렬

  if ((favoriteList ?? []).length >= 20) {
    return { status: "favorite max", statusCd: "M", data: null };
  }

  const { data, error } = await supabase.from("favorite").insert({
    user_id: user.id,
    symbol: symbol,
  });

  if (error) {
    console.error("즐겨찾기 추가 실패:", error.message);
    throw error;
  }

  return { status: "success", statusCd: "S", data };
};

/**
 * 사용자가 특정 코인을 즐겨찾기 했는지 확인하는 API
 * @param symbol
 * @returns
 */
export const checkExistFavorite = async (symbol: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인 필요");

  const { data: existing, error: checkError } = await supabase
    .from("favorite")
    .select("id")
    .eq("user_id", user.id)
    .eq("symbol", symbol)
    .maybeSingle(); // 결과가 0개 or 1개일 때 안전

  if (checkError) {
    console.error("즐겨찾기 확인 실패:", checkError.message);
    throw checkError;
  }

  if (existing) {
    console.log("이미 즐겨찾기에 추가된 symbol입니다.");
    return { status: "exists", data: existing };
  } else {
    console.log("추가하지 않은 symbol입니다.");
    return { status: "not exists", data: null };
  }
};

export const deleteFavorite = async (favoriteId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인 필요");

  const { error } = await supabase
    .from("favorite")
    .delete()
    .eq("id", favoriteId);

  if (error) throw error;

  return {
    status: "success",
    statusCd: "S",
  };
};
