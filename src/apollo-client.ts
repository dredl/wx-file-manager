import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloLink } from "apollo-link"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "@apollo/link-error"
import Cookies from "js-cookie"

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const uploadLink = uri => createUploadLink({ uri })

const authLink = new ApolloLink((operation, forward) => {
  const token = Cookies.get("loginToken")
  const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "en"
  operation.setContext({
    headers: {
      "authorization": token ? token : "",
      "accept-language": language
    }
  })
  return forward(operation)
})

export const client = uri =>
  new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, uploadLink(uri)]) as any,
    cache: new InMemoryCache()
  })
