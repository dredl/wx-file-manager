import React, { FC, useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import warning from "../../../assets/attent.svg"
const GrainReceiptData: FC<any> = props => {
  const [modal, setModal] = useState(false)

  const toggle = e => {
    e.preventDefault()
    setModal(!modal)
  }
  console.log("GRAIN RECEIPT", props)
  const gr = props.grainReceiptData
  const spec = gr.specifications
  const cloneAndPluck = function(sourceObject, keys) {
    const newObject = {}
    keys.forEach((obj, key) => {
      newObject[obj] = sourceObject[obj]
    })
    return newObject
  }

  const shortSpec = cloneAndPluck(spec, [
    "class",
    "fallingNumber",
    "gluten",
    "glutenCU",
    "protein",
    "testWeight",
    "vitreousness",
    "hoodness",
    "moisture",
    "type",
    "grainImpurity",
    "weedyImpurity"
  ])
  return (
    <>
      <span
        className="f-manager__block_item4"
        style={{ marginLeft: "20px", color: "#333", fontSize: "14px", cursor: "pointer", fontFamily: "dinpro-bold" }}
        onClick={toggle}
        // disabled={!amount.isValid}
      >
        Результаты
      </span>
      <Modal isOpen={modal} toggle={toggle} className="grain-receipt" centered={true}>
        <ModalHeader>
          <span style={{ color: "#1a1a1a" }}>
            Зерновая раписка {gr.docNumber.value} -{" "}
            <span style={{ color: "#1fc21f" }}> {gr.specifications.status.value}</span>
          </span>
        </ModalHeader>

        <form className="mad-form" style={{ fontSize: "13px" }}>
          <ModalBody>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #00000024",
                paddingBottom: "20px",
                marginBottom: "20px",
                color: "#333333"
              }}
            >
              <span style={{ fontFamily: "dinpro-bold", lineHeight: "1.2" }}>{gr.specifications.culture.value}</span>
              <span style={{ fontFamily: "dinpro-bold", lineHeight: "1.2" }}>
                {gr.specifications.amount.value} -{" "}
                <span style={{ fontFamily: "dinpro-med" }}>{spec.cropYear.value}</span>
              </span>
            </div>
            <div style={{ display: "flex", borderBottom: "1px solid #00000024", marginBottom: "20px" }}>
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", width: "100%", padding: "0" }}>
                {Object.keys(shortSpec).map((key: any, index) => {
                  console.log(key)
                  return (
                    <li
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "dinpro-bold",
                        marginBottom: "15px"
                      }}
                    >
                      <span style={{ color: "#b3b3b3", fontSize: "13px", lineHeight: "1.2" }}>
                        {shortSpec[key].label}
                      </span>
                      <span style={{ color: "#4d4d4d", fontSize: "20px", lineHeight: "1.2" }}>
                        {shortSpec[key].value}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #00000024",
                marginBottom: "20px",
                paddingBottom: "20px"
              }}
            >
              <span style={{ fontFamily: "dinpro-bold", color: "#b3b3b3" }}>
                {" "}
                {spec.smell.label}: <span style={{ color: "#4d4d4d" }}>{spec.smell.value}</span>
              </span>
              <span style={{ fontFamily: "dinpro-bold", color: "#b3b3b3" }}>
                {" "}
                {spec.infection.label}: <span style={{ color: "#4d4d4d" }}>{spec.infection.value}</span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #00000024",
                marginBottom: "20px",
                paddingBottom: "20px"
              }}
            >
              <span style={{ fontFamily: "dinpro-bold", color: "#b3b3b3" }}>
                {" "}
                {gr.ownerBIN.label}: <span style={{ color: "#4d4d4d" }}>{gr.ownerBIN.value}</span>
              </span>
              <span style={{ fontFamily: "dinpro-bold", color: "#b3b3b3" }}>
                {" "}
                {gr.docNumber.label}: <span style={{ color: "#4d4d4d" }}>{gr.docNumber.value}</span>
              </span>
              <span style={{ fontFamily: "dinpro-bold", color: "#b3b3b3" }}>
                {" "}
                {spec.GRNumber.label}: <span style={{ color: "#4d4d4d" }}>{spec.GRNumber.value}</span>
              </span>
              <span style={{ fontFamily: "dinpro-bold", color: "#b3b3b3" }}>
                {" "}
                {gr.docTime.label}: <span style={{ color: "#4d4d4d" }}>{gr.docTime.value}</span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #00000024",
                marginBottom: "20px",
                paddingBottom: "20px"
              }}
            >
              <span style={{ fontFamily: "dinpro-bold", color: "#b3b3b3" }}>
                {" "}
                {gr.elevatorBIN.label}: <span style={{ color: "#4d4d4d" }}>{gr.elevatorBIN.value}</span>
              </span>
              <span style={{ fontFamily: "dinpro-bold", color: "#b3b3b3" }}>
                {" "}
                {spec.category.label}: <span style={{ color: "#4d4d4d" }}>{spec.category.value}</span>
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <img src={warning} alt="" style={{ width: "25px", marginRight: "20px" }} />
              <span style={{ color: "red", fontFamily: "dinpro-med", lineHeight: "1.2", fontSize: "13px" }}>
                <span style={{ fontFamily: "dinpro-bold" }}>Причина отклонения:</span>Ты че долбаейоп продавать
                зараженную пшеницу. Нам и так тут Тирана с T вирусом хватает. А ты еще хочеш притаранить сюда Яриков с
                LosPlagosom
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="jbtn jbtn-low jbtn-cancel">Подвердить</button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}
export default GrainReceiptData
