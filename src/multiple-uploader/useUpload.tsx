import React, { useReducer, useEffect, useCallback, useContext } from "react"
import {
  UPLOADFILE_LINK_MUTATION,
  REMOVE_LINK_MUTATION,
  SIGN_FILE,
  READ_GRAIN_RECEIPT_DATA,
  MODERATE_LINK_MUTATION
} from "../queries"
import { useMutation } from "react-apollo"
import { client } from "../apollo-client"
import { gatewayClient } from "../apollo-gateway"
import filesize from "filesize"
import { notifyServer } from "wx-notify"
import accepts from "attr-accept"
import UploaderContext from "./UnloaderContext"
const OBJ_TYPE_GRAIN_RECEIPTS = 101

const reducer = (state, action) => {
  console.log("called twice?", state, action)
  switch (action.type) {
    case "loading": {
      const file = action.file
      const fileObj = {
        _id: action.file._id, //temp id before uploading file to server
        loading: true,
        name: file.name,
        size: filesize(file.size),
        metadata: {
          signs: [],
          title: file.name
        }
      }
      return { files: [...state.files, fileObj] }
    }
    case "uploaded": {
      const newArr = [...state.files]
      newArr.forEach((file, index) => {
        if (file._id == action.fileId) {
          newArr[index] = action.file
        }
      })
      action.handleFileActions(newArr)
      return { files: newArr }
    }
    case "remove": {
      const newArr = [...state.files]
      const filter = newArr.filter(file => file._id != action.fileId)
      action.handleFileActions(filter)
      return { files: filter }
    }
    case "moderate": {
      const newArr = [...state.files]
      newArr.forEach((file, index) => {
        if (file._id == action.fileId) {
          newArr[index].metadata.status = action.status
        }
      })
      return { files: newArr }
    }
    case "sign": {
      const newArr = [...state.files]
      newArr.forEach((file, index) => {
        if (file._id == action.file._id) {
          newArr[index] = action.file
        }
      })
      return { files: newArr }
    }

    default:
      return state
  }
}

export const useUpload = ({
  metadata,
  initialFiles,
  maxFileSize,
  enableFakeRemove,
  extensions,
  allowMultiple,
  handleFile = null,
  handleFiles = null
}) => {
  const initialState = { files: initialFiles }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { uploadUri, gatewayUri } = useContext(UploaderContext)
  const [uploadMutation] = useMutation(UPLOADFILE_LINK_MUTATION, {
    client: client(uploadUri),
    context: {
      fetchOptions: {
        useUpload: true,
        // signal: abortController.signal,
        onProgress: (ev: ProgressEvent) => {
          // console.log("loading...", ev.loaded * 100/ev.total + "%")
        },
        onAbortPossible: (abortHandler: any) => {
          // abort = abortHandler
        }
      }
    }
  })
  const [readGrainReceiptData, { data, loading, error }] = useMutation(READ_GRAIN_RECEIPT_DATA, {
    client: gatewayClient(gatewayUri)
  })
  const [removeMutation] = useMutation(REMOVE_LINK_MUTATION, { client: client(uploadUri) })
  const [moderateMutation] = useMutation(MODERATE_LINK_MUTATION, { client: client(uploadUri) })
  // const [signMutation] = useMutation(SIGN_FILE, { client })

  const handleFileActions = useCallback(files => {
    handleFiles && allowMultiple && handleFiles(files)
    handleFile && !allowMultiple && handleFile(files[0])
  }, [])
  const upload = async event => {
    const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files
    const fileListWithIds = []
    const maxFileSizeList = []
    const invalidExtensionsList = []
    if (!allowMultiple && fileList.length > 1) {
      notifyServer({
        Content: () => {
          return <span>Можно загрузить только один файл!</span>
        },
        autoClose: 5000,
        type: "error"
      })
      return
    }
    //dobavlyaem unikalny ID
    for (var i = 0; i < fileList.length; i++) {
      const fileId = Math.random()
        .toString(36)
        .substring(2, 15)
      const file = fileList.item(i)
      if (!accepts(file, extensions)) {
        invalidExtensionsList.push(file)
        continue
      }
      if (file.size > maxFileSize) {
        maxFileSizeList.push(file)
        continue //vse, 4to proisxodit dal'we avtomatom skipitsya
      }

      file._id = fileId
      fileListWithIds.push(file)
    }
    ;(invalidExtensionsList.length || maxFileSizeList.length > 0) &&
      notifyServer({
        type: "error",
        autoClose: 600000,
        Content: () => {
          return (
            <ul>
              {maxFileSizeList.map((file, key) => (
                <li key={key}>
                  Размер файла {file.name} превышаеть допустимый лимит {filesize(maxFileSize)}
                </li>
              ))}
              {invalidExtensionsList.map((file, key) => (
                <li key={key}>
                  Расширение файла {file.name} не соответсвует требованиям формата {extensions}
                </li>
              ))}
            </ul>
          )
        }
      })

    //zasovyvaem vse state s pometkoi loading
    fileListWithIds.forEach(file => {
      dispatch({ type: "loading", file })
    })

    //zagruzhem fayly na server... menyaem status uje zagruzhennogo fayla (loadin = false)
    fileListWithIds.forEach(async file => {
      const uploadedFile: any = await uploadMutation({ variables: { file, metadata } })
      // esly my rabotaem s zernovoi raspiskoi.. togda nuzhno poluchit' dannie zr
      if (metadata.objType == OBJ_TYPE_GRAIN_RECEIPTS) {
        const isRead = await readGrainReceiptData({ variables: { fileId: uploadedFile.data.singleUpload._id } })
        dispatch({
          type: "uploaded",
          file: isRead.data.readGrainReceiptData,
          fileId: file._id,
          handleFileActions
        })
      } else {
        dispatch({
          type: "uploaded",
          file: uploadedFile.data.singleUpload,
          fileId: file._id,
          handleFileActions
        })
      }
    })
  }
  const remove = async fileId => {
    if (!enableFakeRemove) {
      const isRemoved = await removeMutation({ variables: { fileId } })
    }
    dispatch({ type: "remove", fileId, handleFileActions })
  }
  const moderate = async (fileId, status) => {
    const data = await moderateMutation({ variables: { fileId, status } })
    dispatch({ type: "moderate", fileId, status })
  }

  const sign = async signedFile => {
    //Сделано по костыльски, тк. передавая и запуская функцию handleFileActions внутри reducer-a приводит
    //к тому что dispatch срабатывает дважды, следовательно и сама функция что очен критично
    dispatch({ type: "sign", file: signedFile })
    const newArr = [...state.files]
    newArr.forEach((file, index) => {
      if (file._id == signedFile._id) {
        newArr[index] = signedFile
      }
    })
    handleFileActions(newArr)
  }
  return {
    acceptedFiles: state.files,
    uploadFiles: upload,
    removeFile: remove, //remove,
    moderateFile: moderate,
    signFile: sign,
    cancelUpload: null
  }
}
