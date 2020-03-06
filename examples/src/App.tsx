import React, { useState, useContext, useEffect } from "react"
import "./App.css"
import notify, { ToastContainer } from "wx-notify"
import { FileManager } from "../../src/multiple-uploader"
import { useQuery } from "@apollo/client"
import { GET_AVERAGE_GRAIN_RECEIPT_DATA } from "../../src/queries"
import { gatewayClient } from "../../src/apollo-gateway"
import GrainReceiptData from "./modals/GrainReceiptData"
import UploaderContext from "../../src/multiple-uploader/UploaderContext"
const App: React.FC = () => {
  const fakeFile: any = {
    _id: "5d4154630e7f2e0bd4dc79ab",
    createTime: 1564562410,
    metadata: {
      title: "Сертификаты Сертификаты Сертификаты Сертификаты Сертификаты Сертификаты",
      objId: null,
      objType: 101,
      creatorId: "5cb8652b66976e8dd10c5a6a",
      categoryId: "Need to write function",
      signs: [
        { userId: "5cb8652b66976e8dd10c5a6a", time: 0, signed: false, label: "Владалец" },
        { userId: "5cb8652b66976e8dd10c5a6a", time: 0, signed: true, label: "Считано " },
        { userId: "5cb8652b66976e8dd10c5a6a", time: 0, signed: true, label: "Покупатель" }
      ]
    },

    name: "a_e0be3621.jpg a_e0be3621.jpg a_e0be3621.jpg",
    path: "http://85.29.134.227:4010/uploads/5d4153ea0e7f2e0bd4dc798d-a_e0be3621.jpg",
    size: "15 KB"
  }
  const [file, setFile] = useState(null)
  const [file2, setFile2] = useState(fakeFile)
  const [files, setFiles] = useState([])
  const { gatewayUri } = useContext(UploaderContext)
  const [client] = useState(gatewayClient(gatewayUri)) // хз но если передавать gatewayClient напрямую, то uploader не работает

  const { data, loading, error } = useQuery(GET_AVERAGE_GRAIN_RECEIPT_DATA, {
    client,
    variables: { fileIds: files.filter(file => !file.loading).map(file => file._id) }
  })
  useEffect(() => {
    const ExtraContents = []
    files.forEach(file => {
      const ExtraContent = () => {
        if (!file.grainReceiptData) {
          return <></>
        }
        return <GrainReceiptData grainReceiptData={file.grainReceiptData} />
      }
      ExtraContents.push(ExtraContent)
    })
    setExtraContents(ExtraContents)
  }, [files])

  const ResultsButton = ({ toggle }) => {
    return (
      <span className="jbtn jbtn-green" onClick={toggle}>
        Результаты усреднения
      </span>
    )
  }
  const [ExtraContents, setExtraContents] = useState([])

  const handleFile = file => {
    // console.log("Handled", file)
    setFile(file)
  }
  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello World</p>

        <div className="App-panel">
          {data && data.getAverageGrainReceiptData != null && !loading && (
            <GrainReceiptData
              grainReceiptData={data.getAverageGrainReceiptData}
              CustomButton={ResultsButton}
              isAverageModal
            />
          )}
          <FileManager
            allowMultiple={true}
            files={files}
            handleFiles={files => setFiles(files)}
            enableModerate
            ExtraContents={ExtraContents}
            objType={102}
            enableRemove
            needToSign
            extensions=".pdf"
            userId="5e4ae4738ec60508e0c914df"
            // showFileStatus
          />
          <FileManager
            allowMultiple
            theme="button"
            files={files}
            handleFiles={files => setFiles(files)}
            enableModerate
            ExtraContents={ExtraContents}
            objType={102}
            enableRemove
            // needToSign
            extensions=".pdf"
            // userId="5e4504fb007ec8680cfa5967"
            // showFileStatus
          />
        </div>
      </header>
    </div>
  )
}

export default App
