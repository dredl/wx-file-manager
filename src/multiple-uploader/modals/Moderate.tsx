import React, { useState, FC } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { messages } from "../../i18n"
import "./index.scss"
import loader from "../../../assets/loader-white.gif"
const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru"

const Moderate = props => {
  const [modal, setModal] = useState(false)

  const { handleModerate, fileId } = props

  const toggle = e => {
    e.preventDefault()
    setModal(!modal)
  }
  return (
    <>
      <span className="f-manager__block_item4">
        <a href="#" target="_blank" onClick={toggle}>
          {messages[language].moderate}
        </a>
      </span>

      <Modal isOpen={modal} className="prompt" centered={true} toggle={toggle} backdrop="static">
        <ModalHeader>Удаление документа</ModalHeader>
        <ModalBody>Вы уверены что хотите удалить файл?</ModalBody>
        <ModalFooter>
          <button className="jbtn jbtn-low jbtn-cancel" onClick={e => toggle(e)}>
            Отмена
          </button>
          <button
            className="jbtn jbtn-low jbtn-red"
            onClick={e => {
              handleModerate(e, fileId, 0)
              setModal(false)
            }}
          >
            Удалить
          </button>
          <button
            className="jbtn jbtn-low jbtn-green"
            onClick={e => {
              handleModerate(e, fileId, 2)
              setModal(false)
            }}
          >
            Подвердить
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}
const StdLoader: FC<any> = ({ type = "", text }) => {
  const clazz = type ? `loader loader--${type}` : `loader`

  return (
    <div className={clazz}>
      <div className="loader__content">
        <p className="loader__spinner">
          <img
            src={loader}
            style={{
              position: "absolute",
              width: "40px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
            alt=""
          />
          {/* <span className="loader__img" /> */}
        </p>
        {text && <p className="loader__text">{text}</p>}
      </div>
    </div>
  )
}
export default Moderate
