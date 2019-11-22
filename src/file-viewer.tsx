import React, { useContext, useEffect } from "react"
import "./file-viewer.scss"
import SignFile from "./modals/SignFile"
import { FilesContext } from "./context"
import galka from "../assets/galka.svg"
import clock from "../assets/clox.svg"
import doc10 from "../assets/10doc.svg"
import cross from "../assets/34Graycross.svg"
import { messages } from "./i18n"
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
const SignFileStatus = ({ signs }) => {
  return signs.map((sign, key) => (
    <div className="f-manager__block_status" key={key}>
      <img src={sign.signed ? galka : clock} alt="" />
      <span>{sign.label}</span>
    </div>
  ))
}
const Download = ({ path }) => {
  return (
    <span className="f-manager__block_item4">
      <a href={path} download target="_blank">
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

const FakeRemove = ({ handleFakeRemove }) => {
  return (
    <span className="f-manager__block_remove" onClick={e => handleFakeRemove(e)}>
      <img src={cross} alt="" />
    </span>
  )
}

interface IViewer {
  enableRemove?: boolean
  staticFile?: any
  file?: any
  handleRemove: any
  handleSign: any
  ExtraContent?: any //пока используется для того чтобы отменить сгенеренный счет
  enableFakeRemove?: boolean
  handleFakeRemove?: any
}

const Viewer: React.FC<IViewer> = ({
  enableRemove = false,
  file = null,
  handleRemove = null,
  handleSign = null,
  ExtraContent = null,
  enableFakeRemove = false,
  handleFakeRemove = null
}) => {
  const handleRemoveContext = useContext(FilesContext).handleRemove
  const handleFakeRemoveContext = useContext(FilesContext).handleFakeRemove
  const fileContext = useContext(FilesContext).file
  const isLoading = fileContext ? fileContext.loading : false
  const userId = useContext(FilesContext).userId

  useEffect(() => {
    // console.log("File viewer mounted")
    return () => {
      // console.log("File viewer unmounted")
    }
  }, [])
  /** Если userId = null то кнопка подписи отсутсвует */
  const SignButton = ({ signs, fileId }) => {
    let needToSign = false //Нужно ли currentUser-у подписывать документ
    let signed = false // подписал ли currentUser документ

    /** Если он есть в списке sings то ему нужно подписать дкумент */
    signs.forEach(sign => {
      if (userId && sign.userId == userId) {
        needToSign = true
        if (sign.signed) {
          signed = true
        }
      }
    })

    return needToSign && !signed ? <SignFile fileId={fileId} handleSign={handleSign} /> : <div />
  }
  const onRemove = async (e: Event, fileId: string) => {
    e.preventDefault()
    const isRemoved = await handleRemoveContext(fileId)
    if (isRemoved) {
      handleRemove && handleRemove(fileId)
    }
  }
  const onFakeRemove = (e: Event, fileId: string) => {
    handleFakeRemoveContext(fileId)
    handleFakeRemove(fileId)
  }
  return (
    <div className="f-manager">
      <div className="f-manager__block">
        <div className="f-manager__block_item1">
          <img src={doc10} alt="" />
          <div className="item1-text">
            <p title={fileContext.metadata.title}>{fileContext.metadata.title}</p>
            <span>{fileContext.size}</span>
          </div>
        </div>

        <div className="f-manager__block_right">
          <SignFileStatus signs={fileContext.metadata.signs} />
          {!isLoading && <Download path={fileContext.path} />}
          {!isLoading && ExtraContent && <ExtraContent />}
          {!isLoading && enableRemove && <Remove removeDoc={e => onRemove(e, fileContext._id)} />}
          {enableFakeRemove && <FakeRemove handleFakeRemove={e => onFakeRemove(e, fileContext._id)} />}
          {isLoading && <StdSpinner />}
        </div>
      </div>
      <SignButton signs={fileContext.metadata.signs} fileId={file._id} />
    </div>
  )
}

export default Viewer
