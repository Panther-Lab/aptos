"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, createClient, cacheExchange, fetchExchange } from "urql";

import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi";
import { ReactNode } from "react";
import { GRAPH_URI } from "@/lib/network";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: GRAPH_URI })]);

export const queryClient = new QueryClient();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
