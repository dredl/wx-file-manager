import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink, split } from "apollo-link"
import { setContext } from "apollo-link-context"
import Cookies from "js-cookie"

const httpLink = createHttpLink({ uri: "http://192.168.0.106:4000/graphql" })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("loginToken")
  const language = "ru"
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "authorization": token ? token : "", // `Bearer ${token}` : "",
      "accept-language": language
    }
  }
})

export const gatewayClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => {
      return o.id ? `${o.__typename}:${o.id}` : null
    }
  })
})
