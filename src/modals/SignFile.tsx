import React, { useContext, useState, FC, useEffect } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import InputStyleOne from "input-style-one"
import { notifyServer } from "wx-notify"
import { FilesContext } from "../context"
import { useMutation } from "react-apollo"
import { CHECK_EDS_DATA } from "../queries"
import { gatewayClient } from "../apollo-client-2"
import { messages } from "../i18n"
import "./index.scss"
import loader from "../../assets/loader-white.gif"
const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru"

const SignFile = props => {
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [password, setPassword] = useState({ value: "Qwerty12", isValid: false })
  const [p12Base64, setP12Base64] = useState(null)
  const [signLoading, setSignLoading] = useState(false) //loader загрузки при подписи данных (если файл большой, она долго подписывается)

  useEffect(() => {
    // console.log("Sign File mounted")
    return () => {
      setSignLoading(false)
      setModal(false)
      // console.log("Sign File unmounted")
    }
  }, [])

  /** Управление первой модалкой (данные ЭЦП) */
  const toggle = e => {
    e.preventDefault()
    setModal(!modal)
  }

  /** Управление второй модалкой (пароль ЭЦП) */
  const toggle2 = e => {
    e.preventDefault()
    setModal2(!modal2)
  }

  /** Обычный handler поля */
  const handleChange = (result, setStateCallback) => {
    const { value, isValid } = result
    setStateCallback({ value, isValid })
  }
  /** handler родителя */
  const handleSignParent = props.handleSign

  const file = useContext(FilesContext).file
  /** handler контекста */
  const handleSignContext = useContext(FilesContext).handleSign

  const [EDSdata, setEDSData] = useState(null)

  const [checkEDSData, { loading, error }] = useMutation(CHECK_EDS_DATA, { client: gatewayClient })

  const handleSign = async (e, fileId) => {
    e.preventDefault()
    setSignLoading(true)
    const file = await handleSignContext(fileId, p12Base64, password.value)
    handleSignParent && handleSignParent(file)
  }
  const handleEDS = e => {
    e.preventDefault()
    let reader = new FileReader()
    const {
      validity,
      files: [file]
    } = e.target
    if (validity.valid) {
      reader.readAsDataURL(file)
      reader.onload = () => {
        setModal2(!modal2)
        setP12Base64(reader.result)
      }
    }
  }
  const handlePasswordSubmit = e => {
    e.preventDefault()
    checkEDSData({ variables: { p12Base64, password: password.value } })
      .then(({ data }) => {
        setEDSData(data.checkEDSData)
        setModal2(false)
        notifyServer({ dismiss: true })
      })
      .catch(e => {
        const errors = e.graphQLErrors[0].extensions.exception.inputErrors
        notifyServer({
          Content: () => {
            return (
              <ul style={{ padding: 0, margin: 0 }}>
                {errors ? errors.map((error, key) => (<li key={key}>{error.message}</li>) ): "Не удалось проверить данные. Повторите позже"}
              </ul>
            )
          },
          type: "error"
        })
      })
  }
  const RenderContent = () => {
    const randInd = Math.floor(Math.random() * (10000 - 1)) + 1

    if (EDSdata) {
      return (
        <ul className="reg-info">
          <li>
            <p>{messages[language]["Owner of EDS"]}:</p>
            <p className="ecp-info">{EDSdata.owner}</p>
          </li>
          <li>
            <p>{messages[language]["Authority issuing EDS"]}:</p>
            <p className="ecp-info">{EDSdata.issuer}</p>
          </li>
          <li>
            <p>{messages[language]["Valid thought"]}:</p>
            <p className="ecp-info">{EDSdata.expireTime}</p>
          </li>
          <li>
            <p>{messages[language]["IIN"]}:</p>
            <p className="ecp-info">{EDSdata.iin}</p>
          </li>
          <li>
            <p>{messages[language]["BIN"]}:</p>
            <p className="ecp-info">{EDSdata.bin}</p>
          </li>
        </ul>
      )
    }
    return (
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "45px" }}>
        <input
          type="file"
          id={"EDS-sign-" + randInd}
          required
          onChange={e => handleEDS(e)}
          accept=".p12"
          style={{ display: "none" }}
        />
        <label htmlFor={"EDS-sign-" + randInd} className="jbtn jbtn-fuksiya">
          {messages[language]["Select the file with EDS"]}
        </label>
      </div>
    )
  }

  return (
    <>
      <div className="sign-button">
        <button className="jbtn jbtn-wide jbtn-green" onClick={e => toggle(e)}>
          {messages[language].sign}
        </button>
      </div>
      <Modal isOpen={modal} className="prompt" centered={true} toggle={toggle} backdrop="static">
        <ModalHeader>Подписание документа</ModalHeader>
        {(signLoading  || loading )&& <StdLoader type="modal" text="Подписание файла, подождите" /> }
        <form className="mad-form" onSubmit={e => handleSign(e, file._id)}>
          <ModalBody>
            <p style={{ fontFamily: "dinpro-med", fontSize: "13px", lineHeight: "1.3" }}>
              Согласно статьи 24 Закона РК от 7.01.2003 № 370 «Об электронном документе и электронной цифровой подписи»,
              подписанный Электронный документ равнозначен документу на бумажном носителе.
            </p>
            <p style={{ fontFamily: "dinpro-med", fontSize: "13px", lineHeight: "1.3" }}>
              Для подписание эектронного документа, выберите Ваш ЭЦП (GOST или RSA)
            </p>
            <RenderContent />
          </ModalBody>
          <ModalFooter>
            <button className="jbtn jbtn-low jbtn-cancel" onClick={e => toggle(e)}>
              Отмена
            </button>
            <button className="jbtn jbtn-low jbtn-green" type="submit" disabled={!EDSdata}>
              Подписать
            </button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal isOpen={modal2} className="eds-pass" centered={true} backdrop={true}>
        <form className="mad-form" onSubmit={e => handlePasswordSubmit(e)}>
        {loading && <StdLoader type="eds"/> }

          <ModalBody>
            <InputStyleOne
              label="Пароль ЭЦП"
              name="password"
              value={password.value}
              enableTooltip={false}
              rules={["required"]}
              inputType="password"
              handleChange={result => handleChange(result, setPassword)}
            />
          </ModalBody>
          <ModalFooter>
            <button className="jbtn jbtn-low jbtn-cancel" onClick={e => toggle2(e)}>
              Отмена
            </button>
            <button className="jbtn jbtn-low jbtn-green" type="submit" disabled={password.value == ""}>
              Подвердить
            </button>
          </ModalFooter>
        </form>
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
          <img src={loader} className="loader__img" alt=""/>
          {/* <span className="loader__img" /> */}
        </p>
        {text && <p className="loader__text">{text}</p>}
      </div>
    </div>
  )
}
export default SignFile
