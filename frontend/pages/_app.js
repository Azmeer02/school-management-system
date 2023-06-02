import { AuthContextProvider } from "@/contexts/authContext";
import GraphqlProvider from "@/graphql/GraphqlProvider";

function App({ Component, pageProps }) {
  return (
    <GraphqlProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </GraphqlProvider>
  );
}

export default App;
