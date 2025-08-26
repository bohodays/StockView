import { supabase } from "../supabase/client";

/**
 * supabase 회원가입 API
 * @param email
 * @param password
 * @returns
 */
export const signUpWithEmail = async (
  nickname: string,
  email: string,
  password: string
) => {
  // 1. 이메일 & 비밀번호로 회원가입
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError || !signUpData.user) {
    return { error: signUpError };
  }

  // 2. 추가 정보 users 테이블에 저장
  const { error: insertError } = await supabase.from("users").insert({
    id: signUpData.user.id, // auth.users의 uuid
    nickname,
  });

  return { error: insertError };
};

/**
 * supabase 로그인 API
 * @param email
 * @param password
 * @returns
 */
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

/**
 * supabase 사용자 정보 select API
 * @param userId
 * @returns
 */
export const selectUserInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("nickname")
    .eq("id", userId)
    .single();

  return { data, error };
};
