import React from "react";
declare const UploaderContext: React.Context<{
    uploadUri: any;
    gatewayUri: any;
}>;
export declare const UploaderProvider: ({ children, uploadUri, gatewayUri }: {
    children: any;
    uploadUri: any;
    gatewayUri: any;
}) => JSX.Element;
export default UploaderContext;
