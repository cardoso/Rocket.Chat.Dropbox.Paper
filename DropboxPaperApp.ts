import {
    IConfigurationExtend,
    IConfigurationModify,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IRead,
} from '@rocket.chat/apps-ts-definition/accessors';

import { App } from '@rocket.chat/apps-ts-definition/App';
import { IAppInfo } from '@rocket.chat/apps-ts-definition/metadata';

import { DropboxCreatePaperCommand } from './commands/DropBoxCreatePaperCommand';

export class DropboxPaperApp extends App {
    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        configuration.slashCommands.provideSlashCommand(new DropboxCreatePaperCommand(this));
    }
}
