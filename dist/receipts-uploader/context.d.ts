import React from "react";
export declare const FilesContext: React.Context<{
    files: any;
    handleUpload: any;
    handleRemove: any;
    handleFakeRemove: any;
    userId: any;
}>;
declare const FilesProvider: (props: any) => JSX.Element;
export default FilesProvider;
