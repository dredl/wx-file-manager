import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink, split } from "apollo-link"
import { createUploadLink } from "apollo-upload-client"
import { setContext } from "apollo-link-context"
//@ts-ignore
const globalAny: any = global
const token = localStorage.getItem("loginToken")

const httpLink = createHttpLink({
  uri: "http://109.233.109.170:4000/graphql"
  // uri: "http://localhost:4003/graphql" //dev only, comment before publish
})

// const uploadLink = createUploadLink({
//   uri: "http://78.40.109.27:4003/graphql",
//   // uri: "http://localhost:4003/graphql" //dev only, comment before publish
//   fetch: typeof window === "undefined" ? globalAny.fetch : customFetch
// })

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("loginToken")
//   const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "en-US"
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       "authorization": token ? token : "", // `Bearer ${token}` : "",
//       "accept-language": language
//     }
//   }
// })

// const isObject = node => typeof node === "object" && node !== null
// const hasFiles = (node, found = []) => {
//   Object.keys(node).forEach(key => {
//     if (!isObject(node[key]) || found.length > 0) {
//       return
//     }

//     if (
//       (typeof File !== "undefined" && node[key] instanceof File) ||
//       (typeof Blob !== "undefined" && node[key] instanceof Blob)
//     ) {
//       found.push(node[key])
//       return
//     }

//     hasFiles(node[key], found)
//   })

//   return found.length > 0
// }
// const link2 = split(({ variables }) => hasFiles(variables), uploadLink, httpLink)

export const gatewayClient = new ApolloClient({
  link: ApolloLink.from([httpLink]), //authLink.concat(link),
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => {
      return o.id ? `${o.__typename}:${o.id}` : null
    }
  })
})
// function customFetch(url, opts = {} as any) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest()

//     xhr.open(opts.method || "get", url)

//     for (let k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k])

//     xhr.onload = e => {
//       const eAny: any = e
//       resolve({
//         ok: true,
//         text: () => Promise.resolve(eAny.target.responseText),
//         json: () => Promise.resolve(JSON.parse(eAny.target.responseText))
//       })
//     }

//     xhr.onerror = reject

//     if (xhr.upload) xhr.upload.onprogress = event => console.log(`${(event.loaded / event.total) * 100}% uploaded`)

//     xhr.send(opts.body)
//   })
// }
