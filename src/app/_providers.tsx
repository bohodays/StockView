"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

/**
 * Global Providers
 */
const Provider = ({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default Provider;
