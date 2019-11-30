import React, { useState, useEffect } from "react"
import { useMutation, useQuery, useLazyQuery } from "react-apollo"
import filesize from "filesize"
import { REMOVE_LINK_MUTATION, UPLOADFILE_LINK_MUTATION, SIGN_FILE, CHECK_EDS_DATA } from "./queries"
import { client } from "./apollo-client"
import notify, { ToastContainer, notifyServer } from "wx-notify"
export const FilesContext = React.createContext({
  file: null,
  handleUpload: null, // () => null,
  handleRemove: null, // () => null,
  handleSign: null, // () => null,
  handleFakeRemove: null,
  // checkEDSData: null,
  userId: null
})

const FilesProvider = props => {
  const uploadMutation = useMutation(UPLOADFILE_LINK_MUTATION, { client })
  const removeMutation = useMutation(REMOVE_LINK_MUTATION, { client })
  const signMutation = useMutation(SIGN_FILE, { client })

  const { children, userId } = props
  const [file, setFile] = useState(props.file)
  useEffect(() => {
    setFile(props.file)
  }, [props.file])
  const upload = async (e, { objId, objType, objCode, needToSign, maxFileSize }) => {
    const {
      validity,
      files: [file]
    } = e.target
    let sizeValid = true
    let fileObj = null
    const metadata = {
      objType, //set default to 999 = not set
      objId, //set default to "" = not set
      objCode,
      needToSign
    }

    const randId = Math.floor(Math.random() * (10000 - 1)) + 1

    if (validity.valid && file.size > maxFileSize) {
      notifyServer({
        type: "error",
        Content: () => {
          return <span>Загружаемый файл превышаеть допустимый лимит {filesize(maxFileSize)}</span>
        }
      })
      e.target.value = null
      sizeValid = false
    }
    if (validity.valid && sizeValid) {
      /** default template until file is loading */
      fileObj = {
        _id: randId,
        loading: true,
        name: file.name,
        size: filesize(file.size),
        metadata: {
          signs: [],
          title: file.name
        }
      }
      setFile(fileObj)
      const fileFromServer = await uploadMutation[0]({
        variables: { file, metadata }
      }).then(({ data }) => {
        /** when is uploaded, replace fileObject to real file from server*/
        fileObj = { ...data.singleUpload, loading: false }
        setFile(fileObj)
        return fileObj
      })
      return fileFromServer
    }
  }
  // const checkEDS = async e => {

  // }

  const remove = async fileId => {
    const result = await removeMutation[0]({ variables: { fileId } }).then(({ data }) => {
      setFile(null)
      return true
    })
    return result
  }

  const fakeRemove = fileId => {
    console.log("FakeRemove activated")
    setFile(null)
    return true
  }

  const sign = async (fileId, p12Base64, password) => {
    let file = null
    try {
      file = await signMutation[0]({ variables: { fileId, p12Base64, password } })
    } catch (error) {
      notifyServer({
        Content: () => {
          return (
            <span>
              {error.graphQLErrors ? error.graphQLErrors[0].message : "Ошибка подписи, повторите попытку позже"}
            </span>
          )
        },
        type: "error"
      })
    }
    if (file) {
      notify({
        header: "Файл подписан",
        description: "Файл успешно подписан!!!"
      })
      setFile(file.data.signDocument)
      return file.data.signDocument
    }
    return null
  }
  return (
    <FilesContext.Provider
      value={{
        file: file,
        userId: userId,
        handleUpload: upload,
        // checkEDSData: e => checkEDS(e),
        handleRemove: fileId => remove(fileId),
        handleFakeRemove: fileId => fakeRemove(fileId),
        handleSign: (fileId, p12Base64, password) => sign(fileId, p12Base64, password)
      }}
    >
      {children}
    </FilesContext.Provider>
  )
}
export default FilesProvider
