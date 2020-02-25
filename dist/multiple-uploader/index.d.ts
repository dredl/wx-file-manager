import React, { FC } from "react";
import "../index.scss";
interface IFileManager {
    allowMultiple?: boolean;
    file?: object;
    files?: Array<object>;
    handleFile?(file: object): void;
    handleFiles?(files: Array<object>): void;
    ExtraContent?: FC;
    ExtraContents?: Array<FC>;
    theme?: string;
    userId?: string;
    uploadText?: string;
    extensions?: string;
    objId?: string;
    objType?: number;
    objCode?: number;
    maxFileSize?: number;
    needToSign?: boolean;
    enableRemove?: boolean;
    enableModerate?: boolean;
    enableFakeRemove?: boolean;
    showFilename?: boolean;
    showFileStatus?: boolean;
}
/**
 * Улучшенная версия загрузчика файлов.
 * @param props
 */
export declare const FileManager: React.FC<IFileManager>;
export {};
