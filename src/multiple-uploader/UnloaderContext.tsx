import React, { createContext } from "react"

const UploaderContext = createContext({
  uploadUri: null,
  gatewayUri: null
})

export const UploaderProvider = ({ children, uploadUri, gatewayUri }) => {
  return (
    <UploaderContext.Provider
      value={{
        uploadUri,
        gatewayUri
      }}
    >
      {children}
    </UploaderContext.Provider>
  )
}

export default UploaderContext
