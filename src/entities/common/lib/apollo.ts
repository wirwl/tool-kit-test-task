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
