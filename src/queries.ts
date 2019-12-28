import gql from "graphql-tag"
export const grainReceiptsData = gql`
  fragment GrainReceiptsData on GrainReceiptsData {
    docNumber
    docTime
    ownerBIN
    elevatorBIN
    specifications {
      status
      GRNumber
      createTime
      amount
      culture
      class
      cropYear
      category
      grade
      reproduction
      seedCompositionClass
      moisture
      weedyImpurity
      grainImpurity
      infection
      infectionLevel
      smell
      color
      type
      testWeight
      gluten
      glutenCU
      hoodness
      fallingNumber
      protein
      vitreousness
      otherIndicators
    }
    errors
  }
`

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
      grainReceiptData {
        ...GrainReceiptsData
      }
    }
    ${grainReceiptsData}
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

export const UPLOAD_MULTIPLE_LINK_MUTATION = gql`
  mutation multipleUpload($files: [Upload], $metadata: MetadataInput) {
    multipleUpload(files: $files, metadata: $metadata) {
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

export const GET_AVERAGE_GRAIN_RECEIPT_DATA = gql`
  query getAverageGrainReceiptData($fileIds: [String]) {
    getAverageGrainReceiptData(fileIds: $fileIds) {
      ...GrainReceiptsData
    }
  }
  ${grainReceiptsData}
`

export const READ_GRAIN_RECEIPT_DATA = gql`
  mutation readGrainReceiptData($fileId: String) {
    readGrainReceiptData(fileId: $fileId) {
      ...CommonFiles
    }
  }
  ${fileFragments.common}
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
