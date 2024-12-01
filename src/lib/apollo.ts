import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";

// Fix the URI by removing the redundant "https://"
const httpLink = createHttpLink({
  uri: "https://frinzai-superstate.hypermode.app/graphql", // Corrected URI
});

// Create a custom auth middleware
export const createApolloClient = (token: string | null) => {
  console.log("Creating Apollo Client with token:", token); // Temporary log

  const authMiddleware = new ApolloLink((operation, forward) => {
    // Log the operation name and headers for debugging
    console.log("GraphQL Operation:", operation.operationName);

    const headers = {
      authorization: token ? `Bearer ${token}` : "",
    };

    console.log("Request Headers:", headers); // Temporary log

    operation.setContext(({ headers: existingHeaders = {} }) => ({
      headers: {
        ...existingHeaders,
        ...headers,
      },
    }));

    return forward(operation);
  });

  return new ApolloClient({
    link: authMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only",
      },
      query: {
        fetchPolicy: "network-only",
      },
    },
  });
};
