import { ApolloCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const GraphqlProvider = ({ children }) => {
  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_END_POINT,
  });

  const client = new ApolloClient({
    cache: ApolloCache,
    link: uploadLink,
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
