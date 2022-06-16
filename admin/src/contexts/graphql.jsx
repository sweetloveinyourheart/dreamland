import { GRAPHQL_ENDPOINT } from "constants/apollo";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT, // Server URL (must be absolute)
})

const authLink = (token) => {
    return setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    })
};

function createApolloClient(token) {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: authLink(token).concat(httpLink),
        cache: new InMemoryCache({
            addTypename: false
        })
    })
}

export function useClient(token) {
    const store = useMemo(() => createApolloClient(token), [token])
    return store
}

export function useApollo() {
    return useContext(ApolloContext)
}

const ApolloContext = createContext({})

function GraphQLProvider({ children }) {
    const [accessToken, setAccessToken] = useState()
    const client = useClient(accessToken)

    const saveToken = useCallback((token) => {
        setAccessToken(token)
    }, [accessToken])

    const memoedValue = useMemo(() => ({
        accessToken,
        saveToken
    }), [accessToken, saveToken])

    return (
        <ApolloContext.Provider value={memoedValue}>
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        </ApolloContext.Provider>
    );
}

export default GraphQLProvider;