import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

export function initApolloClient(token: string="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") {
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return client;
}
