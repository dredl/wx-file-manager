import React from "react";
import "../file-viewer.scss";
interface IViewer {
    enableRemove?: boolean;
    staticFile?: any;
    file: any;
    userId: any;
    handleRemove: any;
    handleSign: any;
    ExtraContent?: any;
    enableFakeRemove?: boolean;
    handleFakeRemove?: any;
}
declare const Viewer: React.FC<IViewer>;
export default Viewer;
