import React from "react";
import "./index.scss";
interface IFileUploader {
    theme?: string;
    uploadText?: string;
    objType?: number;
    objId?: string;
    objCode?: string;
    file?: any;
    handleUpload?: any;
    handleRemove?: any;
    handleSign?: any;
    tool?: string;
    enableRemove?: boolean;
    userId?: string;
    extensions?: string;
    ExtraContent?: any;
    needToSign?: boolean;
    enableFakeRemove?: boolean;
    handleFakeRemove?: any;
    maxFileSize?: number;
}
/**
 * @param theme Есть 2 вида загрузчика: 1. Стандарный 2. Серая кнопка
 * @param uploadText Заголовок загрузчика
 * @param objId ID связанного объекта
 * @param maxFileSize максимальный размер загружаемого файла
 * @param objCode Code связанного объекта
 * @param objType Тип связанного объекта (Товар Сделка Торги и тд)
 * @param handleUpload ок
 * @param handleRemove ок
 * @param handleSign ок
 * @param tool по умолчанию - FileManager, если tool="uploader" то выйдет компонент загрузчика
 * @param enableRemove  можно ли удалять файл, но помоему это уже не актульно
 * @param userId равен null если текущему пользователю не нужно подписывать документ
 * @param extensions какие расширения разрешены для загузки файла
 * @param needTosign нужно ли подписывать файл пользователю
 * @param enableFakeRemove По сути эта кнопка делает все тоже самое что и реальный remove, только не отрпавляет запрос на сервер, по хорошнму она должна удалять сервером после подверждения той или иной формы
 * @param handleFakeRemove Обработчик ложного удаления файла. Доступно только когда tool="viewer"
 * TODO: нужно сделать еще fakeRemove. Например, когда ползователь редактурет товар, при нажатии кнопки УДАЛИТЬ не должен удалять файл из сервера до тех пор пока не созранить форму
 * TODO: сделать ограничения по размеру файла, по умолчанию сделать 5MB
 * TODO: нужно реализовать loading у removeMutation и signMutation
 */
declare const FileUploader: React.FC<IFileUploader>;
export * from "./multiple-uploader";
export default FileUploader;
