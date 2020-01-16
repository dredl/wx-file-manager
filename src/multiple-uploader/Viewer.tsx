import React from "react"
import "../file-viewer.scss"

import galka from "../../assets/galka.svg"
import crossRed from "../../assets/cross_red.svg"
import cross from "../../assets/34Graycross.svg"
import clock from "../../assets/clox.svg"
import doc10 from "../../assets/10doc.svg"

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
const SignFileStatus = ({ signs, objType }) => {
  if (signs.length == 0) {
    return <></>
  }
  return (
    <div className="f-manager__signs">
      <span className="f-manager__signs_label">
        {objType == OBJ_TYPE_GRAIN_RECEIPTS ? "Статус зерновой расписки:" : "Подписи:"}
      </span>
      {signs.map((sign, key) => (
        <div className="f-manager__block_status" key={key}>
          <img src={sign.signed ? galka : objType == OBJ_TYPE_GRAIN_RECEIPTS ? crossRed : clock} alt="" />
          <span className={!sign.signed && objType == OBJ_TYPE_GRAIN_RECEIPTS ? "f-manager__block_status_error" : ""}>
            {sign.label}
          </span>
        </div>
      ))}
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
  staticFile?: any
  file: any
  userId: any
  handleRemove: any
  handleSign: any
  ExtraContent: any
  enableFakeRemove?: boolean
  handleFakeRemove?: any
  showFilename: boolean
}

const Viewer: React.FC<IViewer> = ({
  enableRemove = false,
  file,
  userId = null,
  handleRemove = null,
  ExtraContent,
  handleSign = null,
  showFilename
}) => {
  const isLoading = file ? file.loading : false

  let needToSign = false //Нужно ли currentUser-у подписывать документ
  let signed = false // подписал ли currentUser документ

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
            {!isLoading && <Download path={file.path} />}
            {!isLoading && ExtraContent && <ExtraContent />}
            {!isLoading && enableRemove && <Remove removeDoc={e => onRemove(e, file._id)} />}
            {isLoading && <StdSpinner />}
          </div>
        </div>
        {!isLoading && <SignFileStatus signs={file.metadata.signs} objType={file.metadata.objType} />}
      </div>
      {needToSign && !signed && <SignFile fileId={file._id} handleSign={handleSign} />}
    </>
  )
}

export default Viewer
