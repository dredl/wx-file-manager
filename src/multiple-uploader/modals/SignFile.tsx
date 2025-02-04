import React, { useState, FC, useEffect, useContext } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import InputStyleOne from "input-style-one"
import notify, { notifyServer } from "wx-notify"
import { useMutation } from "@apollo/client"
import { CHECK_EDS_DATA, SIGN_FILE } from "../../queries"
import { gatewayClient } from "../../apollo-gateway"
import { client } from "../../apollo-client"
import { messages } from "../../i18n"
import "./index.scss"
import loader from "../../../assets/loader-white.gif"
import UploaderContext from "../UploaderContext"
const language = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : "ru"
interface ISignFile {
  fileId: string
  handleSign(file: object): void
  signed: boolean
}

const SignFile: FC<ISignFile> = props => {
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [password, setPassword] = useState({ value: "Qwerty12", isValid: false })
  const [p12Base64, setP12Base64] = useState(null)
  const { uploadUri, gatewayUri } = useContext(UploaderContext)
  useEffect(() => {
    return () => {
      setModal(false)
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

  /** Лучше mutation делать здесь т.к. легче хендлить loading, error непосредственно в компоненте, где она и используется  */
  const [signFile, { loading: sLoading }] = useMutation(SIGN_FILE, { client: client(uploadUri) })

  const [EDSdata, setEDSData] = useState(null)
  const [checkEDSData, { loading, error }] = useMutation(CHECK_EDS_DATA, { client: gatewayClient(gatewayUri) })

  const handleSign = async (e, fileId) => {
    e.preventDefault()
    let file = null
    try {
      file = await signFile({ variables: { fileId, p12Base64, password: password.value } })
    } catch (error) {
      notifyServer({
        Content: () => {
          return (
            <span>
              {error.graphQLErrors ? error.graphQLErrors[0].message : "Ошибка подписи, повторите попытку позже"}
            </span>
          )
        },
        type: "error"
      })
    }

    if (file) {
      notify({
        header: messages[language].signPushHedaer,
        description: messages[language].signPushMessage
      })
      handleSignParent && handleSignParent(file.data.signDocument)
      setModal(false)
    } else {
      setEDSData(null)
    }
  }

  /**
   * Берем содержимое файла ключа (base64) и помещаем ее в state, это много не занимает время тк. файли не весит много
   * Потом вытаскиваем модалку с паролем
   * @param e
   */
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

  /**
   * У нас есть файл (base64), есть пароль - отправляем на проверку
   * @param e
   */
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
                {errors
                  ? errors.map((error, key) => <li key={key}>{error.message}</li>)
                  : "Не удалось проверить данные. Повторите позже"}
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
      {!props.signed && (
        <div className="sign-button">
          <button className="jbtn jbtn-wide jbtn-green" onClick={e => toggle(e)}>
            {messages[language].sign}
          </button>
        </div>
      )}

      <Modal isOpen={modal} className="prompt" centered={true} toggle={toggle} backdrop="static">
        <ModalHeader>{messages[language].signModalHeader}</ModalHeader>
        {(sLoading || loading) && <StdLoader type="modal" />}
        <form className="mad-form" onSubmit={e => handleSign(e, props.fileId)}>
          <ModalBody>
            <p style={{ fontFamily: "dinpro-med", fontSize: "13px", lineHeight: "1.3" }}>
              {messages[language].signModalMessage1}
            </p>
            <p style={{ fontFamily: "dinpro-med", fontSize: "13px", lineHeight: "1.3" }}>
              {messages[language].signModalMessage2}
            </p>
            <RenderContent />
          </ModalBody>
          <ModalFooter>
            <button className="jbtn jbtn-low jbtn-cancel" onClick={e => toggle(e)}>
              {messages[language].cancel}
            </button>
            <button className="jbtn jbtn-low jbtn-green" type="submit" disabled={!EDSdata}>
              {messages[language].confirm}
            </button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal isOpen={modal2} className="eds-pass" centered={true} backdrop={true}>
        <form className="mad-form" onSubmit={e => handlePasswordSubmit(e)}>
          {loading && <StdLoader type="eds" />}

          <ModalBody>
            <InputStyleOne
              label={messages[language].edsPassword}
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
              {messages[language].cancel}
            </button>
            <button className="jbtn jbtn-low jbtn-green" type="submit" disabled={password.value == ""}>
              {messages[language].confirm}
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
        </p>
        {text && <p className="loader__text">{text}</p>}
      </div>
    </div>
  )
}
export default SignFile
