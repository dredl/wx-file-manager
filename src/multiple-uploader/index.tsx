import React, { useEffect } from "react"
import addFile from "../../assets/add-file.svg"
import filesize from "filesize"
import Viewer from "./Viewer"
import { DragAndDrop } from "./DragAndDrop"
import { useUpload } from "./useUpload"
import "../index.scss"
import GrainReceiptData from "./modals/GrainReceiptData"
import { useQuery } from "react-apollo"
import { gatewayClient } from "../apollo-client-2"
import { GET_AVERAGE_GRAIN_RECEIPT_DATA } from "../queries"
interface IFileManager {
  files: Array<object> | object
  allowMultiple: boolean
  userId: string
  uploadText: string
  extensions: string
  objId: string
  objType: number
  objCode: number
  maxFileSize: number
  needToSign: boolean
  enableRemove: boolean
  enableFakeRemove: boolean
  handleFiles(files: Array<object> | object): void
}

const FileManager: React.FC<any> = props => {
  const {
    files,
    allowMultiple = false,
    userId = null,
    uploadText = "Зерновые расписки",
    extensions = "",
    objId,
    objType,
    objCode = "",
    maxFileSize = 1024 * 1024 * 5,
    needToSign,
    enableRemove = false,
    enableFakeRemove = false,
    handleFiles = null
  } = props

  const metadata = { objType, objId, objCode, needToSign }

  const { files: localFiles, uploadFiles, removeFile, signFile } = useUpload({
    metadata,
    initialFiles: files,
    maxFileSize,
    enableFakeRemove,
    extensions
  })
  const { data, loading, error } = useQuery(GET_AVERAGE_GRAIN_RECEIPT_DATA, {
    client: gatewayClient,
    variables: { fileIds: localFiles.filter(file => !file.loading).map(file => file._id) }
  })

  //Передаем файлы родителю при каждом изменении
  useEffect(() => {
    handleFiles && handleFiles(localFiles)
  }, [localFiles])
  /**
   * Если allowMultiple = true... То отображаем ее всегда
   * Если allowMultiple = false files.lengh == 1... тогда скрыть ее
   */
  const Uploader = () => {
    if (allowMultiple == false && localFiles.length > 0) {
      return <></>
    }
    return (
      <div className="mad-uploader-select-file">
        {uploadText && <p>{uploadText}</p>}
        <input
          type="file"
          name="mad-file"
          id={"mad-file-upload-receipts"}
          accept={extensions}
          key={Date.now()}
          multiple
          required
          onChange={uploadFiles}
        />
        {data && data.getAverageGrainReceiptData != null && !loading && (
          <GrainReceiptData grainReceiptData={data.getAverageGrainReceiptData} />
        )}
        <DragAndDrop handleDrop={uploadFiles}>
          <label htmlFor={"mad-file-upload-receipts"}>
            <div className="mad-uploader-load">
              <img src={addFile} alt="" />
              <span>Выберите файл</span>
              {extensions != "*" && (
                <span style={{ color: "#B3B3B3", marginLeft: "5px" }}>
                  ({extensions}, {filesize(maxFileSize)})
                </span>
              )}
            </div>
          </label>
        </DragAndDrop>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Uploader />
      <div>
        {localFiles
          .map((file, key) => {
            const ExtraContent = ({ grainReceiptData }) => {
              return <GrainReceiptData grainReceiptData={grainReceiptData} />
            }
            return (
              <Viewer
                file={file}
                key={key}
                userId={userId}
                handleRemove={removeFile}
                enableRemove={enableRemove}
                handleSign={signFile}
                ExtraContent={metadata.objType == 101 ? ExtraContent : null}
              />
            )
          })
          .reverse()}
      </div>
    </div>
  )
}

export default FileManager
