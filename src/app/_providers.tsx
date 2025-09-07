"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";

/**
 * Global Providers
 */
const Provider = ({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider {...props}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default Provider;
