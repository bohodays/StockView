import HomePage from "./HomePage";

interface SearchParams {
  login?: string;
}

/**
 * 메인 페이지
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  return <HomePage loginStatus={sp.login} />;
}
