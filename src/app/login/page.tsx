import React from "react";
import LoginPage from "./LoginPage";

interface SearchParams {
  signup?: string;
}

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const sp = await searchParams;

  return <LoginPage signupSuccess={sp.signup} />;
};

export default Page;
