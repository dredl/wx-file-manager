import React, { useReducer } from "react"
import { UPLOADFILE_LINK_MUTATION, REMOVE_LINK_MUTATION, SIGN_FILE, READ_GRAIN_RECEIPT_DATA } from "../queries"
import { useMutation } from "react-apollo"
import { client } from "../apollo-client"
import { gatewayClient } from "../apollo-client-2"
import filesize from "filesize"
import { notifyServer } from "wx-notify"
import accepts from "attr-accept"
const OBJ_TYPE_GRAIN_RECEIPTS = 101

const reducer = (state, action) => {
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
      return { files: newArr }
    }
    case "remove": {
      const newArr = [...state.files]
      const filter = newArr.filter(file => file._id != action.fileId)
      return { files: filter }
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

  const [uploadMutation] = useMutation(UPLOADFILE_LINK_MUTATION, {
    client,
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
    client: gatewayClient
  })
  const [removeMutation] = useMutation(REMOVE_LINK_MUTATION, { client })
  // const [signMutation] = useMutation(SIGN_FILE, { client })

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
        dispatch({ type: "uploaded", file: isRead.data.readGrainReceiptData, fileId: file._id })
      } else {
        dispatch({ type: "uploaded", file: uploadedFile.data.singleUpload, fileId: file._id })
      }
      handleFiles && allowMultiple && handleFiles(state.files)
      handleFile && !allowMultiple && handleFile(state.files[0])
    })
  }
  const remove = async fileId => {
    if (!enableFakeRemove) {
      const isRemoved = await removeMutation({ variables: { fileId } })
    }
    dispatch({ type: "remove", fileId })
    handleFiles && allowMultiple && handleFiles(state.files)
    handleFile && !allowMultiple && handleFile(state.files[0])
  }

  const sign = async signedFile => {
    dispatch({ type: "sign", file: signedFile })
    handleFiles && allowMultiple && handleFiles(state.files)
    handleFile && !allowMultiple && handleFile(state.files[0])
  }
  return {
    acceptedFiles: state.files,
    uploadFiles: upload,
    removeFile: remove, //remove,
    signFile: sign,
    cancelUpload: null
  }
}
