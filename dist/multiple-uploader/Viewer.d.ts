import React from "react";
import "../file-viewer.scss";
interface IViewer {
    enableRemove?: boolean;
    enableModerate?: boolean;
    staticFile?: any;
    file: any;
    userId: any;
    handleRemove: any;
    handleModerate: any;
    handleSign: any;
    ExtraContent: any;
    enableFakeRemove?: boolean;
    handleFakeRemove?: any;
    showFilename: boolean;
    showFileStatus: boolean;
}
declare const Viewer: React.FC<IViewer>;
export default Viewer;
