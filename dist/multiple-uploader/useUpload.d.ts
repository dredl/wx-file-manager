export declare const useUpload: ({ metadata, initialFiles, maxFileSize, enableFakeRemove, extensions }: {
    metadata: any;
    initialFiles: any;
    maxFileSize: any;
    enableFakeRemove: any;
    extensions: any;
}) => {
    files: any;
    uploadFiles: (event: any) => Promise<void>;
    removeFile: (fileId: any) => Promise<void>;
    signFile: (signedFile: any) => Promise<void>;
    cancelUpload: any;
};
