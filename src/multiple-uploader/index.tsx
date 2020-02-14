import React, { useEffect } from "react"
import addFile from "../../assets/add-file.svg"
import filesize from "filesize"
import Viewer from "./Viewer"
import { DragAndDrop } from "./DragAndDrop"
import { useUpload } from "./useUpload"
import "../index.scss"
//todo придумать как сделать так чтобы был requred либо file либо files
// Пока не вижу смысла устанавливать wx-constants изза одной константы
// export const OBJ_TYPE_GRAIN_RECEIPTS = 101
// type fileOrFiles<T> = T | T[]
// type Opts<T> = { file: fileOrFiles<T> } | { files: fileOrFiles<T> }

interface IFileManager {
  allowMultiple?: boolean
  file?: object // если allowMultiple = false file помещяеться сюда
  files?: Array<object> // если allowMultiple = true files помещяются сюда
  handleFile?(file: object): void // если allowMultiple = false срабатывает он
  handleFiles?(files: Array<object>): void // если allowMultiple = true срабатывает он
  ExtraContent?: JSX.Element
  ExtraContents?: Array<JSX.Element>
  //остальные пропсы работают независимо от allowMultiple
  theme?: string
  userId?: string
  uploadText?: string
  extensions?: string
  objId?: string
  objType?: number
  objCode?: number
  maxFileSize?: number
  needToSign?: boolean
  enableRemove?: boolean
  enableDisable?: boolean
  enableFakeRemove?: boolean
  showFilename?: boolean // Отображать file.name или file.metadata.title. по умолчанию false
  showFileStatus?: boolean // Отображать ли статус файла. 0 - отклонен, 1 на модерации 2 проверен
}

/**
 * Улучшенная версия загрузчика файлов.
 * @param props
 */
export const FileManager: React.FC<IFileManager> = props => {
  const {
    allowMultiple = false,
    files,
    file,
    handleFile = null,
    handleFiles = null,
    ExtraContent = () => <></>,
    ExtraContents = [],
    theme = "default",
    userId = null,
    uploadText = "Загрузка файлов",
    extensions = "",
    objId = "",
    objType = 999,
    objCode = "",
    maxFileSize = 1024 * 1024 * 5, //5MB
    needToSign = false,
    enableRemove = false,
    enableDisable = false,
    enableFakeRemove = false,
    showFilename = false,
    showFileStatus = false
  } = props

  const metadata = { objType, objId, objCode, needToSign }

  const { acceptedFiles, uploadFiles, removeFile, moderateFile, signFile } = useUpload({
    allowMultiple,
    metadata,
    initialFiles: allowMultiple ? files : file ? [file] : [], //files или file должны использоваться только здесь, дальше в код им идти нельзя
    maxFileSize,
    enableFakeRemove,
    extensions,
    handleFile,
    handleFiles
  })

  //Передаем файлы родителю при каждом изменении
  // @deprecated - пришлось эту логику отправлять в useUpload, тк handleFile должен срабатывать только тогда когда
  // реально происходит зарузка-удаление-подписание. А по ЭТОЙ логике handleFiles будет вызываться как мин когда компонент
  // замаунтиться
  // useEffect(() => {
  //   handleFiles && allowMultiple && handleFiles(acceptedFiles)
  //   handleFile && !allowMultiple && handleFile(acceptedFiles[0])
  // }, [acceptedFiles])

  /**
   * Загрузчик файлов
   * Если allowMultiple = true - то отображаем ее всегда независимо от количества загруженных файлов
   * Если allowMultiple = false files.lengh == 1 - тогда скрыть ее, показать только когда files.lengh == 0 т.е не загружен
   */
  const Uploader = () => {
    if (allowMultiple == false && acceptedFiles.length > 0) {
      return <></>
    }
    const randId = Math.floor(Math.random() * (10000 - 1)) + 1

    const Default = () => {
      return (
        <>
          <div className="mad-uploader-select-file">
            {uploadText && <p>{uploadText}</p>}
            <DragAndDrop handleDrop={uploadFiles}>
              <label htmlFor={`file-manager-${randId}`}>
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
        </>
      )
    }
    const Button = () => {
      return (
        <label htmlFor={`file-manager-${randId}`} className="jbtn jbtn-green mad-uploader-button">
          {uploadText}
          {extensions != "*" && (
            <span style={{ fontFamily: "dinpro-med" }}>
              ({extensions}, {filesize(maxFileSize)})
            </span>
          )}
        </label>
      )
    }
    return (
      <>
        <input
          type="file"
          name="mad-file"
          id={`file-manager-${randId}`}
          accept={extensions}
          style={{ display: "none" }}
          key={randId}
          multiple={allowMultiple}
          required
          onChange={uploadFiles}
        />
        {theme == "default" && <Default />}
        {theme == "button" && <Button />}
      </>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "inherit" }}>
      <Uploader />
      <div>
        {acceptedFiles
          .map((file, key) => {
            return (
              <Viewer
                file={file}
                key={key}
                userId={userId}
                handleRemove={removeFile}
                handleModerate={moderateFile}
                enableRemove={enableRemove}
                enableModerate={enableDisable}
                handleSign={signFile}
                ExtraContent={
                  allowMultiple ? (ExtraContents.length > 0 ? ExtraContents[key] : ExtraContent) : ExtraContent
                }
                showFilename={showFilename}
                showFileStatus={showFileStatus}
              />
            )
          })
          .reverse()}
      </div>
    </div>
  )
}
