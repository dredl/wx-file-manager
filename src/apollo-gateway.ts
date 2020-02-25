import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { ApolloLink } from "apollo-link"
import Cookies from "js-cookie"

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

export const gatewayClient = uri =>
  new ApolloClient({
    link: authLink.concat(new HttpLink({ uri }) as any) as any,
    cache: new InMemoryCache({
      dataIdFromObject: (o: any) => {
        return o.id ? `${o.__typename}:${o.id}` : null
      }
    })
  })
