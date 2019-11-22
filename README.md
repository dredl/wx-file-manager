## WExport File Manager
React Based File Manager specially created for Wexport 2.0 Project

### Installation
```sh
$ npm install wx-file-manager
```

### Example
```javascript
import FileManager from 'wx-file-manager'

<FileManager
  uploadText="Зерновая расписка"
  file={file}
  handleUpload={file => setFile(file)}
  handleRemove={fileId => setFile(null)}
  handleSign={file => setFile(file)}
  objType={101}
  tool="uploader"
  extensions=".pdf, .png"
  userId="<UserId> from SessionContext"
/>

```

## Props
+ `tool` - По умолчанию `viewer`. Если нужен загрузчик файлов - напиши `uploader`
+ `uploadText?` - что будет написано сверху загрузчика, если не будет, то тупо не будет
+ `theme?` - Есть 2 вида загрузчика: 1. Стандарный 2. Серая кнопка
+ `objId?` - ID связанного объекта
+ `objCode` - Code связанного объекта
+ `objType?` - Тип связанного объекта (Товар Сделка Торги и тд)
+ `handleUpload?` - Событие, которое срабатывает при загрузки файла на сервер. Возвращает объект `file`
+ `handleRemove?` - Событие, которое срабатывает при удалении файла. Возвращает `fileId`
+ `handleSign?` - Событие, которое срабатывает при подписании документа. Возвращает подписанные `file`
+ `enableRemove?` - можно ли удалять файл, но помоему это уже не актульно
+ `userId?` - равен null если текущему пользователю не нужно подписывать документ. Если нужно обязательно отправлять это значение.
+ `extensions?` - `string` какие расширения разрешены для загузки файла
+ `needToSign?` - По умолчанию `false`. Нужно ли подписывать файл пользователю.
+ `maxFileSize?` - Максимальный размер загружаемого файла. По умолчанию `1024*1024*5` т.е. 5MB
+ `enableFakeRemove` - Делает то же самое что `enableRemove` только не удаляет файл на сервере. Полезно когда необходимо редактировать форму.
+ `handleFakeRemove` - Событие, которое срабатывает при удалении  `fake` файла. Возвращает `fileId`

### Примеры как нужно обрабатывать файл в компонентах:
Можете написать лучше, но если не хотите заморачиваться, you are welcome :) `Ctrl+A Ctrl+C Ctrl+V`
```javascript
const handleUpload = file => {
  setDocuments([...documents, file])
}
const handleRemove = fileId => {
  setDocuments(_.filter(documents, doc => doc._id !== fileId))
}
const handleSign = file => {
  _.remove(documents, doc => doc._id === file._id)
  setDocuments([...documents, file])
}
```