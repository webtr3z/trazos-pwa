"use client";

import { ReactNode } from "react";

interface JotaiProviderProps {
  children: ReactNode;
}

export function JotaiProvider({ children }: JotaiProviderProps) {
  return <>{children}</>;
}
