import React from "react";
export declare const FilesContext: React.Context<{
    file: any;
    handleUpload: any;
    handleRemove: any;
    handleSign: any;
    handleFakeRemove: any;
    userId: any;
}>;
declare const FilesProvider: (props: any) => JSX.Element;
export default FilesProvider;
