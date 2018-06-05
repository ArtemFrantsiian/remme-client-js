import { IRemmeAccount } from "./interface";
declare class RemmeAccount implements IRemmeAccount {
    private _signer;
    address: string;
    publicKeyHex: string;
    privateKeyHex: string;
    constructor(privateKeyHex?: string);
    readonly privateKey: any;
    sign(transaction: any): any;
}
export { RemmeAccount, IRemmeAccount };