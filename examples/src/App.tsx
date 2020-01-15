import React, { useState, useContext, useEffect } from "react"
import "./App.css"
import FileUploader from "../../src"
import notify, { ToastContainer } from "wx-notify"
import { FileManager } from "../../src/multiple-uploader"
import { useQuery } from "react-apollo"
import { GET_AVERAGE_GRAIN_RECEIPT_DATA } from "../../src/queries"
import { gatewayClient } from "../../src/apollo-client-2"
import GrainReceiptData from "./modals/GrainReceiptData"
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
  const { data, loading, error } = useQuery(GET_AVERAGE_GRAIN_RECEIPT_DATA, {
    client: gatewayClient,
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
    console.log("Handled")
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
            // allowMultiple={true}
            file={fakeFile}
            handleFile={handleFile}
            // ExtraContent={ExtraContents}
            // showFilename
            // theme="button"
            objType={102}
            // file={file2}
            // handleFile={file => setFile2(file)}
            // maxFileSize={1024 * 1024 * 0.5}
            // enableFakeRemove
            enableRemove
            // needToSign
            extensions=".pdf"
            // userId="5de28370ab07a10b197efc84"
          />
          {/* <FileUploader
            tool="logo-manager"
            file={file}
            handleUpload={file => setFile(file)}
            handleRemove={fileId => setFile(null)}
          /> */}
          <br />
          <br />
          {/* <FileUploader
            // uploadText="Зерновая раскписка"
            file={file}
            handleUpload={file => console.log(file)}
            handleRemove={fileId => setFile(null)}
            handleSign={file => setFile(file)}
            objType={101}
            objCode={"G-fkkf"}
            tool="uploader"
            needToSign={true}
            // maxFileSize={1024 * 1024 * 0.5}
            // extensions=".pdf, .png"
            userId="5de28370ab07a10b197efc84"
          /> */}
          {/* <FileUploader
            // uploadText="Зерновая раскписка"
            file={file}
            handleUpload={file => setFile(file)}
            handleRemove={fileId => setFile(null)}
            handleSign={file => setFile(file)}
            objType={101}
            objCode={"G-fkkf"}
            tool="uploader"
            needToSign={true}
            // maxFileSize={1024 * 1024 * 0.5}
            extensions=".pdf, .png"
            userId="5de28370ab07a10b197efc84"
          /> */}
          {/* <FileUploader
            uploadText="Зерновая раскписка"
            file={file}
            handleUpload={file => setFile(file)}
            handleRemove={fileId => setFile(null)}
            handleSign={file => setFile(file)}
            objType={101}
            theme="inactive-button"
            extensions=".pdf, .png"
            tool="uploader"
            // userId="5cb8652b66976e8dd10c5a6a"
          /> */}
          {/* <FileUploader
            file={file2}
            handleUpload={file => setFile2(file)}
            handleRemove={fileId => setFile2(null)}
            handleSign={file => setFile2(file)}
            objType={101}
            userId="5cb8652b66976e8dd10c5a6a"
            // ExtraContent={() => {
            //   return (
            //     <span className="f-manager__block_item4" style={{ marginLeft: "10px" }}>
            //       Test
            //     </span>
            //   )
            // }}
          /> */}
          {/* <FileUploader
            file={file2}
            tool="uploader"
            handleUpload={file => setFile2(file)}
            handleRemove={fileId => setFile2(null)}
            handleSign={file => setFile2(file)}
            objType={101}
            enableFakeRemove={true}
            handleFakeRemove={fileId => console.log("fakeRemove", fileId)}
          /> */}
        </div>
      </header>
    </div>
  )
}

export default App
