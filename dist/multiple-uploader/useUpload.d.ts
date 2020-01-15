export declare const useUpload: ({ metadata, initialFiles, maxFileSize, enableFakeRemove, extensions, allowMultiple }: {
    metadata: any;
    initialFiles: any;
    maxFileSize: any;
    enableFakeRemove: any;
    extensions: any;
    allowMultiple: any;
}) => {
    acceptedFiles: any;
    uploadFiles: (event: any) => Promise<void>;
    removeFile: (fileId: any) => Promise<void>;
    signFile: (signedFile: any) => Promise<void>;
    cancelUpload: any;
};
