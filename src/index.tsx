import React, { useContext, useEffect } from "react"
import FileManager from "./file-viewer"
import FileProvider, { FilesContext } from "./context"
import { ToastContainer } from "wx-notify"
import addFile from "../assets/add-file.svg"
import "./index.scss"
import LogoUploader from "./logo-uploader"
import { messages } from "./i18n"
interface IFileUploader {
  theme?: string
  uploadText?: string
  objType?: number
  objId?: string
  objCode?: string
  file?: any
  handleUpload?: any
  handleRemove?: any
  handleSign?: any
  tool?: string
  enableRemove?: boolean
  userId?: string
  extensions?: string
  ExtraContent?: any
  needToSign?: boolean
  enableFakeRemove?: boolean
  handleFakeRemove?: any
}

/**
 * @param theme Есть 2 вида загрузчика: 1. Стандарный 2. Серая кнопка
 * @param uploadText Заголовок загрузчика
 * @param objId ID связанного объекта
 * @param objCode Code связанного объекта
 * @param objType Тип связанного объекта (Товар Сделка Торги и тд)
 * @param handleUpload ок
 * @param handleRemove ок
 * @param handleSign ок
 * @param tool по умолчанию - FileManager, если tool="uploader" то выйдет компонент загрузчика
 * @param enableRemove  можно ли удалять файл, но помоему это уже не актульно
 * @param userId равен null если текущему пользователю не нужно подписывать документ
 * @param extensions какие расширения разрешены для загузки файла
 * @param needTosign нужно ли подписывать файл пользователю
 * @param enableFakeRemove По сути эта кнопка делает все тоже самое что и реальный remove, только не отрпавляет запрос на сервер, по хорошнму она должна удалять сервером после подверждения той или иной формы
 * @param handleFakeRemove Обработчик ложного удаления файла. Доступно только когда tool="viewer"
 * TODO: нужно сделать еще fakeRemove. Например, когда ползователь редактурет товар, при нажатии кнопки УДАЛИТЬ не должен удалять файл из сервера до тех пор пока не созранить форму
 * TODO: сделать ограничения по размеру файла, по умолчанию сделать 5MB
 * TODO: нужно сделать такую тему, что када клиенту нужно загрузить file и не нужно ее подписывать, а галочка уже была. Сейчас эта работает только с нерезидентом (реализовано на сервере)
 * TODO: нужно реализовать loading у removeMutation и signMutation
 */
const FileUploader: React.FC<IFileUploader> = props => {
  const {
    theme = "default",
    uploadText = null,
    objId = "",
    objCode = "",
    objType = 999,
    file,
    ExtraContent = null,
    handleUpload = null,
    handleRemove = null,
    handleSign = null,
    tool = "viewer",
    enableRemove = null,
    userId = null,
    extensions = "*",
    needToSign = true,
    enableFakeRemove = false,
    handleFakeRemove = null
  } = props
  const randInd = Math.floor(Math.random() * (10000 - 1)) + 1
  const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru"
  const RenderContent = () => {
    const fileContext = useContext(FilesContext).file
    if (tool == "viewer") {
      return (
        <FileManager
          file={fileContext}
          handleRemove={handleRemove}
          handleSign={handleSign}
          ExtraContent={ExtraContent}
          enableFakeRemove={enableFakeRemove}
          handleFakeRemove={handleFakeRemove}
        />
      )
    }

    /**Если нужно загрудать файл */

    const handleUploadContext = useContext(FilesContext).handleUpload

    const upload = async (e, { objId, objType }) => {
      e.preventDefault()
      const file = await handleUploadContext(e, { objId, objType, objCode, needToSign })
      handleUpload && handleUpload(file)
    }
    if (tool == "logo-manager") {
      return (
        <LogoUploader
          handleUpload={e => upload(e, { objId, objType })}
          handleRemove={handleRemove}
          file={fileContext}
        />
      )
    }
    const loading = fileContext ? fileContext.loading : false
    /** Если файла нет и файл не грузиться на сервер, показать загрузчик */
    if (!fileContext && !loading) {
      if (theme == "inactive-button") {
        return (
          <label htmlFor={"mad-file-upload-" + randInd} className="jbtn jbtn-green mad-uploader-button">
            {uploadText}
            {extensions != "*" && <span style={{ fontFamily: "dinpro-med" }}> ({extensions})</span>}
            <input
              type="file"
              name="mad-file"
              id={"mad-file-upload-" + randInd}
              required
              onChange={e => upload(e, { objId, objType })}
              accept={extensions}
            />
          </label>
        )
      } else {
        return (
          <div className="mad-uploader-select-file">
            {uploadText && <p>{uploadText}</p>}
            <input
              type="file"
              name="mad-file"
              id={"mad-file-upload-" + randInd}
              accept={extensions}
              required
              onChange={e => upload(e, { objId, objType })}
            />
            <label htmlFor={"mad-file-upload-" + randInd}>
              <div className="mad-uploader-load">
                <img src={addFile} alt="" />
                <span>{messages[language].chooseFile}</span>
                {extensions != "*" && <span style={{ color: "#B3B3B3", marginLeft: "5px" }}>({extensions})</span>}
              </div>
            </label>
          </div>
        )
      }
    }

    return (
      <FileManager
        enableRemove={enableRemove != null ? enableRemove : true}
        enableFakeRemove={enableFakeRemove}
        handleFakeRemove={handleFakeRemove}
        file={fileContext}
        handleRemove={handleRemove}
        handleSign={handleSign}
      />
    )
  }
  return (
    <FileProvider file={file} userId={userId}>
      <RenderContent />
    </FileProvider>
  )
}
export default FileUploader
