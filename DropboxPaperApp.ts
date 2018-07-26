import {
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-ts-definition/accessors';

import { App } from '@rocket.chat/apps-ts-definition/App';
import { IAppInfo } from '@rocket.chat/apps-ts-definition/metadata';

import { DropboxCreatePaperCommand } from './commands/DropBoxCreatePaperCommand';

export class DropboxPaperApp extends App {
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(new DropboxCreatePaperCommand(this));
    }
}
