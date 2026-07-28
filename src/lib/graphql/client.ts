import { cacheExchange, createClient, fetchExchange } from "urql";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:7001/graphql";

console.log("[GraphQL Client] Endpoint:", GRAPHQL_ENDPOINT);

export function createGraphQLClient(authToken?: string) {
  return createClient({
    url: GRAPHQL_ENDPOINT,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      return { headers };
    },
  });
}

// Create a default client for server-side and initial client-side rendering
export const graphqlClient = createGraphQLClient();
