import { HttpClient, AxiosRequestConfig } from "remme-http-client";
import { RemmeMethods } from "./remme-methods";
import { IRemmeRest } from "./interface";

class RemmeRest implements IRemmeRest {
    private readonly _nodeAddress: string;
    private readonly _socketAddress: string;

    public constructor(nodeAddress: string = "localhost:8080", socketAddress: string = "localhost:9080") {
        this._nodeAddress = nodeAddress;
        this._socketAddress = socketAddress;
    }

    public nodeAddress = (): string => this._nodeAddress;
    public socketAddress = (): string => this._socketAddress;

    public async getRequest<Output>(method: RemmeMethods, payload?: string): Promise<Output> {
        return await this.sendRequest<string, Output>("GET", method, payload);
    }

    public async putRequest<Input, Output>(method: RemmeMethods, payload: Input): Promise<Output> {
        return await this.sendRequest<Input, Output>("PUT", method, payload);
    }

    public async postRequest<Input, Output>(method: RemmeMethods, payload: Input): Promise<Output> {
        return await this.sendRequest<Input, Output>("POST", method, payload);
    }

    public async deleteRequest<Input, Output>(method: RemmeMethods, payload: Input): Promise<Output> {
        return await this.sendRequest<Input, Output>("DELETE", method, payload);
    }

    private async sendRequest<Input, Output>(method: string, remmeMethod: RemmeMethods, payload?: Input)
        : Promise<Output> {
        try {
            const url = this.getUrlForRequest<Input>(remmeMethod, method.toUpperCase() === "GET" ? payload : null);
            const options: AxiosRequestConfig = {
                url,
                method,
                [method.toUpperCase() === "GET" ? "params" : "data"]: payload,
            };
            const response = await HttpClient.send(options);
            return response.data;
        } catch (e) {
            throw new Error(`Please check if your node running at http://${this._nodeAddress}`);
        }
    }

    private getUrlForRequest<Input>(method: RemmeMethods, payload?: Input): string {
        let methodUrl: string = method;

        if (payload) {
           methodUrl += `/${payload}${method === RemmeMethods.userPublicKeys ? "/pub_keys" : ""}`;
        }

        return `http://${this._nodeAddress}/api/v1/${methodUrl}`;
    }
}

export {
    RemmeMethods,
    RemmeRest,
    IRemmeRest,
};
