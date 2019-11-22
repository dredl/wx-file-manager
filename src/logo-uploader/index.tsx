import "./index.scss"
import React, { useContext } from "react"
import addImg from "../../assets/addImg.svg"
import crossImput from "../../assets/cross-imput.svg"
import { FilesContext } from "../context"
export const LogoUploader = ({ file, handleUpload, handleRemove }) => {
  const handleRemoveContext = useContext(FilesContext).handleRemove
  const fileContext = useContext(FilesContext).file
  const isLoading = fileContext ? fileContext.loading : false
  const logoId = file ? file._id : ""
  const logoPath = file ? file.path : ""

  const StdSpinner = () => {
    return (
      <div className="mad-uploader-spinner" style={{ marginLeft: "0" }}>
        <div className="sk-three-bounce">
          <div className="sk-bounce-1 sk-child" />
          <div className="sk-bounce-2 sk-child" />
          <div className="sk-bounce-3 sk-child" />
        </div>
      </div>
    )
  }

  const onRemove = async (e: Event, fileId: string) => {
    e.preventDefault()
    const isRemoved = await handleRemoveContext(fileId)
    if (isRemoved) {
      handleRemove && handleRemove(fileId)
    }
  }
  /** Лоадер */
  if (isLoading) {
    return (
      <div className="mad-logo-uploader">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
          <StdSpinner />
        </div>
      </div>
    )
  }
  /** Файл загружен */
  if (logoPath) {
    return (
      <div className="mad-logo-uploader">
        {isLoading ? <StdSpinner /> : <img src={logoPath} alt="" />}

        <img className="mad-logo-uploader__remove" src={crossImput} alt="" onClick={e => onRemove(e as any, logoId)} />
      </div>
    )
  }

  /** Файл отсутсвует, показываем загрузчик */
  return (
    <div className="mad-logo-uploader">
      <input type="file" name="mad-file" id="mad-logo-upload" required onChange={handleUpload} accept="image/*" />
      <label htmlFor="mad-logo-upload">
        <img src={addImg} alt="" />
      </label>
    </div>
  )
}

export default LogoUploader
