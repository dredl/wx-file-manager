import React from "react"
import "../file-viewer.scss"

import galka from "../../assets/galka.svg"
import crossRed from "../../assets/cross_red.svg"
import cross from "../../assets/34Graycross.svg"
import clock from "../../assets/clox.svg"
import doc10 from "../../assets/10doc.svg"
import ModerateModal from "./modals/Moderate"
import { messages } from "../i18n"
import SignFile from "./modals/SignFile"
const OBJ_TYPE_GRAIN_RECEIPTS = 101
const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru"

const StdSpinner = () => {
  return (
    <div className="mad-uploader-spinner">
      <div className="sk-three-bounce">
        <div className="sk-bounce-1 sk-child" />
        <div className="sk-bounce-2 sk-child" />
        <div className="sk-bounce-3 sk-child" />
      </div>
    </div>
  )
}
const SignFileStatus = ({ metadata, showFileStatus }) => {
  const { signs, objType, status } = metadata
  if (!showFileStatus && signs.length == 0) {
    return <></>
  }
  const FileStatus = () => {
    if (!showFileStatus) {
      return <></>
    }
    let data = {
      icon: "",
      className: "",
      label: ""
    }
    // отклонен
    if (status == 0) {
      data = {
        icon: crossRed,
        className: "f-manager__block_status_error",
        label: messages[language].fileStatusInModeration
      }
    }
    //на модерации
    if (status == 1) {
      data = { icon: clock, className: "", label: messages[language].refused }
    }
    // проверен
    if (status == 2) {
      data = { icon: galka, className: "", label: messages[language].confirmed }
    }
    return (
      <>
        <span className="f-manager__signs_label">{messages[language].documentStatus}</span>
        <div className="f-manager__block_status">
          <img src={data.icon} alt="" />
          <span className={data.className}>{data.label}</span>
        </div>
      </>
    )
  }

  const SignsStatus = () => {
    if (signs.length == 0 || objType == OBJ_TYPE_GRAIN_RECEIPTS) {
      return <></>
    }
    return (
      <>
        <span className="f-manager__signs_label">
          {objType == OBJ_TYPE_GRAIN_RECEIPTS ? messages[language].grStatus : messages[language].filStatus}
        </span>
        {signs.map((sign, key) => (
          <div className="f-manager__block_status" key={key}>
            <img src={sign.signed ? galka : clock} alt="" />
            <span>{sign.label}</span>
          </div>
        ))}
      </>
    )
  }

  const GrainReceiptsStatus = () => {
    if (signs.length == 0 || objType != OBJ_TYPE_GRAIN_RECEIPTS) {
      return <></>
    }
    return (
      <>
        <span className="f-manager__signs_label">{messages[language].grStatus}</span>
        {signs.map((sign, key) => (
          <div className="f-manager__block_status" key={key}>
            <img src={sign.signed ? galka : crossRed} alt="" />
            <span className={!sign.signed ? "f-manager__block_status_error" : ""}>{sign.label}</span>
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="f-manager__signs">
      <FileStatus />
      <GrainReceiptsStatus />
      <SignsStatus />
    </div>
  )
}
const Download = ({ path }) => {
  return (
    <span className="f-manager__block_item4">
      <a href={path} target="_blank">
        {messages[language].download}
      </a>
    </span>
  )
}
const Remove = ({ removeDoc }) => {
  return (
    <span className="f-manager__block_remove" onClick={e => removeDoc(e)}>
      <img src={cross} alt="" />
    </span>
  )
}

interface IViewer {
  enableRemove?: boolean
  enableModerate?: boolean
  staticFile?: any
  file: any
  userId: any
  handleRemove: any
  handleModerate: any
  handleSign: any
  ExtraContent: any
  enableFakeRemove?: boolean
  handleFakeRemove?: any
  showFilename: boolean
  showFileStatus: boolean
}

const Viewer: React.FC<IViewer> = ({
  enableRemove = false,
  enableModerate = false,
  file,
  userId = null,
  handleRemove = null,
  handleModerate = null,
  ExtraContent,
  handleSign = null,
  showFilename,
  showFileStatus
}) => {
  const isLoading = file ? file.loading : false

  let needToSign = false // Нужно ли currentUser-у подписывать документ
  let signed = false // Подписал ли currentUser документ

  /** Если он есть в списке sings то ему нужно подписать дкумент */
  file.metadata.signs.forEach(sign => {
    if (userId && sign.userId == userId) {
      needToSign = true
      if (sign.signed) {
        signed = true
      }
    }
  })
  const onRemove = async (e: Event, fileId: string) => {
    e.preventDefault()
    handleRemove(fileId)
  }
  const onModerate = async (e: Event, fileId: string, status: number) => {
    e.preventDefault()
    handleModerate(fileId, status)
  }
  return (
    <>
      <div className="f-manager">
        <div className="f-manager__block">
          <div className="f-manager__block_item1">
            <img src={doc10} alt="" />
            <div className="item1-text">
              <p title={showFilename ? file.name : file.metadata.title}>
                {showFilename ? file.name : file.metadata.title}
              </p>
            </div>
          </div>

          <div className="f-manager__block_right">
            {!isLoading && enableModerate && <ModerateModal fileId={file._id} handleModerate={onModerate} />}
            {!isLoading && <Download path={file.path} />}
            {!isLoading && ExtraContent && <ExtraContent />}
            {!isLoading && enableRemove && <Remove removeDoc={e => onRemove(e, file._id)} />}

            {isLoading && <StdSpinner />}
          </div>
        </div>
        {!isLoading && <SignFileStatus metadata={file.metadata} showFileStatus={showFileStatus} />}
      </div>
      {needToSign && <SignFile fileId={file._id} handleSign={handleSign} signed={signed} />}
    </>
  )
}

export default Viewer
