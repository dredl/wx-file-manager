import React, { useState, useContext, useEffect } from "react"
import "./App.css"
import FileUploader from "../../src"
import notify, { ToastContainer } from "wx-notify"
const App: React.FC = () => {
  const fakeFile = {
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
        { userId: "5cb8652b66976e8dd10c5a6a", time: 0, signed: true, label: "Пидр" },
        { userId: "5cb8652b66976e8dd10c5a6a", time: 0, signed: true, label: "Покупатель" }
      ]
    },

    name: "a_e0be3621.jpg",
    path: "http://85.29.134.227:4010/uploads/5d4153ea0e7f2e0bd4dc798d-a_e0be3621.jpg",
    size: "15 KB"
  }
  const [file, setFile] = useState(null)
  const [file2, setFile2] = useState(fakeFile)
  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello World</p>

        <div className="App-panel">
          {/* <FileUploader
            tool="logo-manager"
            file={file}
            handleUpload={file => setFile(file)}
            handleRemove={fileId => setFile(null)}
          /> */}
          <FileUploader
            // uploadText="Зерновая раскписка"
            file={file}
            handleUpload={file => setFile(file)}
            handleRemove={fileId => setFile(null)}
            handleSign={file => setFile(file)}
            objType={101}
            objCode={"G-fkkf"}
            tool="uploader"
            // maxFileSize={1024 * 1024 * 0.5}
            extensions=".pdf, .png"
            userId="5cb8652b66976e8dd10c5a6a"
          />
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
