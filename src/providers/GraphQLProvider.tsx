"use client";

import { useMemo } from "react";
import { Provider } from "urql";
import { createGraphQLClient } from "@/lib/graphql/client";

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export function GraphQLProvider({ children }: GraphQLProviderProps) {
  const client = useMemo(() => createGraphQLClient(), []);

  return <Provider value={client}>{children}</Provider>;
}
