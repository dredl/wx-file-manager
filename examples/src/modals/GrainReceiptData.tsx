import React, { FC, useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { Alert as CustomAlert } from "./Alerts"
// import "./index.scss"

interface IGrainReceiptData {
  grainReceiptData: any
  CustomButton?: JSX.Element
  Alert?: JSX.Element
  isAverageModal?: boolean
}

/**
 * Ошибка у одной ЗР может быть 2 причины: она зарадена или БИН-ы не совпадают
 * Ошибка у усредненных ЗР может быть много - продоаольтвенное зерно, дубликация, запах и тд
 */
const GrainReceiptData: FC<any> = props => {
  const [modal, setModal] = useState(false)

  const toggle = e => {
    e.preventDefault()
    setModal(!modal)
  }
  const { CustomButton = null, Alert = null, isAverageModal = false } = props

  const gr = props.grainReceiptData
  const spec = gr.specifications
  const errors = gr.errors
  const dataCanBeSettled = [
    "class",
    "moisture",
    "weedyImpurity",
    "grainImpurity",
    "testWeight",
    "gluten",
    "glutenCU",
    "hoodness",
    "fallingNumber",
    "protein",
    "vitreousness"
  ]
  const dataCannotBeSettled = ["category", "smell", "type", "infection"]

  const otherData = isAverageModal ? ["ownerBIN", "elevatorBIN"] : ["ownerBIN", "docNumber", "docTime", "elevatorBIN"]

  const GRAlert = () => {
    if (isAverageModal && errors && errors.length > 0) {
      return Alert
    }
    if (errors && errors.length > 0) {
      return <CustomAlert theme="red" description="Ваша зерновая расписка не может быть допущена" />
    }
    return <></>
  }
  const Header = () => {
    if (isAverageModal) {
      return <ModalHeader>Результаты усреднения зерновых расписок</ModalHeader>
    }

    return (
      <ModalHeader>
        Зерновая раписка {gr.docNumber.value} -<span> {gr.specifications.status.value}</span>
      </ModalHeader>
    )
  }
  return (
    <>
      {isAverageModal ? (
        <CustomButton toggle={toggle} />
      ) : (
        <span className="f-manager__block_item4" style={{ marginLeft: "10px" }} onClick={toggle}>
          <a href="#" onClick={toggle}>
            Результаты
          </a>
        </span>
      )}

      <Modal isOpen={modal} toggle={toggle} className="grain-receipt" centered={true}>
        <Header />
        <ModalBody>
          <div className="modal-body__content">
            <span style={{ fontFamily: "dinpro-bold", lineHeight: "1.2" }}>{gr.specifications.culture.value}</span>
            <span style={{ fontFamily: "dinpro-bold", lineHeight: "1.2" }}>
              {gr.specifications.amount.value} - <span style={{ fontFamily: "dinpro-med" }}>2018-2019 года</span>
            </span>
          </div>
          <div className="modal-body__content" style={{ flexDirection: "row" }}>
            <ul className="modal-body__specifications">
              {dataCanBeSettled.map((item, index) => (
                <li key={index}>
                  <span>{spec[item].label}</span>
                  <span>{spec[item].value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-body__content">
            {dataCannotBeSettled.map((item, index) => (
              <span className="modal-body__info" key={index}>
                {spec[item].label}: <span>{spec[item].value}</span>
              </span>
            ))}
          </div>
          <div className="modal-body__content" style={{ border: "none", paddingBottom: 0, marginBottom: 0 }}>
            {otherData.map((item, index) => (
              <span className="modal-body__info" key={index}>
                {gr[item].label}:{" "}
                {errors && errors.some(error => error.attribute == item) ? (
                  <span style={{ color: "red" }}>{errors.find(error => error.attribute == item).message}</span>
                ) : (
                  <span>{gr[item].value}</span>
                )}
              </span>
            ))}
            <span className="modal-body__info">
              Элеватор: <span>Товарищество с ограниченной ответственностью "АЛТЫН ДАН"</span>
            </span>

            {spec.GRNumber.id != null && (
              <span className="modal-body__info">
                {spec.GRNumber.label}: <span>{spec.GRNumber.value}</span>
              </span>
            )}
          </div>
          <br />

          <GRAlert />
        </ModalBody>
        <ModalFooter>
          <button className="jbtn jbtn-low jbtn-cancel">Подвердить</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default GrainReceiptData
