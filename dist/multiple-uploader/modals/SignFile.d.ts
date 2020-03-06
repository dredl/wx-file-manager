import { FC } from "react";
import "./index.scss";
interface ISignFile {
    fileId: string;
    handleSign(file: object): void;
    signed: boolean;
}
declare const SignFile: FC<ISignFile>;
export default SignFile;
