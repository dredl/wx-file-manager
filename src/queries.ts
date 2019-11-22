import gql from "graphql-tag"

export const fileFragments = {
  common: gql`
    fragment CommonFiles on Files {
      _id
      path
      name
      size
      createTime
      metadata {
        title
        objId
        objType
        creatorId
        categoryId
        signs {
          userId
          time
          signed
          label
        }
      }
    }
  `
}

export const UPLOADFILE_LINK_MUTATION = gql`
  mutation singleUpload($file: Upload, $metadata: MetadataInput) {
    singleUpload(file: $file, metadata: $metadata) {
      ...CommonFiles
    }
  }
  ${fileFragments.common}
`
export const CHECK_EDS_DATA = gql`
  mutation checkEDSData($p12Base64: String, $password: String) {
    checkEDSData(p12Base64: $p12Base64, password: $password) {
      owner
      issuer
      expireTime
      iin
      bin
    }
  }
`
export const REMOVE_LINK_MUTATION = gql`
  mutation deleteFile($fileId: String) {
    deleteUpload(fileId: $fileId)
  }
`
export const SIGN_FILE = gql`
  mutation signDocument($fileId: String, $p12Base64: String, $password: String) {
    signDocument(fileId: $fileId, p12Base64: $p12Base64, password: $password) {
      ...CommonFiles
    }
  }
  ${fileFragments.common}
`
