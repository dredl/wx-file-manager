import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink, split } from "apollo-link"
import { createUploadLink } from "apollo-upload-client"
import { setContext } from "apollo-link-context"
//@ts-ignore
const globalAny: any = global
const httpLink = createHttpLink({
  uri: "http://109.233.109.170:4003/graphql"
  // uri: "http://localhost:4003/graphql" //dev only, comment before publish
})

const customFetch = (uri: any, options: any) => {
  if (options.useUpload) {
    return uploadFetch(uri, options);
  }
  return fetch(uri, options);
};
const uploadLink = createUploadLink({
  uri: "http://109.233.109.170:4003/graphql",
  // uri: "http://localhost:4003/graphql" //dev only, comment before publish
  fetch: customFetch as any
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getCookie("loginToken")
  const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "en-US"
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "authorization": token ? token : "", // `Bearer ${token}` : "",
      "accept-language": language
    }
  }
})

const isObject = node => typeof node === "object" && node !== null
const hasFiles = (node, found = []) => {
  Object.keys(node).forEach(key => {
    if (!isObject(node[key]) || found.length > 0) {
      return
    }

    if (
      (typeof File !== "undefined" && node[key] instanceof File) ||
      (typeof Blob !== "undefined" && node[key] instanceof Blob)
    ) {
      found.push(node[key])
      return
    }

    hasFiles(node[key], found)
  })

  return found.length > 0
}
const link2 = split(({ variables }) => hasFiles(variables), uploadLink, httpLink)

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, link2]), //authLink.concat(link),
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => {
      return o.id ? `${o.__typename}:${o.id}` : null
    }
  })
})
const parseHeaders = (rawHeaders: any) => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
  preProcessedHeaders.split(/\r?\n/).forEach((line: any) => {
    const parts = line.split(":");
    const key = parts.shift().trim();
    if (key) {
      const value = parts.join(":").trim();
      headers.append(key, value);
    }
  });
  return headers;
};
export const uploadFetch = (url: string, options: any) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const opts: any = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || "")
      };
      opts.url =
        "responseURL" in xhr
          ? xhr.responseURL
          : opts.headers.get("X-Request-URL");
      const body = "response" in xhr ? xhr.response : (xhr as any).responseText;
      resolve(new Response(body, opts));
    };
    xhr.onerror = () => {
      reject(new TypeError("Network request failed"));
    };
    xhr.ontimeout = () => {
      reject(new TypeError("Network request failed"));
    };
    xhr.open(options.method, url, true);

    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    if (xhr.upload) {
      xhr.upload.onprogress = options.onProgress;
    }

    options.onAbortPossible(() => {
      xhr.abort();
    });

    xhr.send(options.body);
  });

function getCookie(cname) {
  var name = cname + "="
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(";")
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}
