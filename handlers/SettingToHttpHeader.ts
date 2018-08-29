import {
    IHttpPreRequestHandler,
    IHttpRequest,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';

export class SettingToHttpHeader implements IHttpPreRequestHandler {
    constructor(private readonly settingKey: string, private readonly header: string) { }

    // tslint:disable-next-line:max-line-length
    public async executePreHttpRequest(url: string, request: IHttpRequest, read: IRead, persistence: IPersistence): Promise<IHttpRequest> {
        const settingValue = await read.getEnvironmentReader().getSettings().getValueById(this.settingKey);

        if (typeof settingValue !== 'string' || settingValue.length === 0) {
            throw new Error('Invalid setting value!');
        }

        if (typeof request.headers === 'undefined') {
            request.headers = { };
        }

        request.headers[this.header] = settingValue;

        return request;
    }
}
