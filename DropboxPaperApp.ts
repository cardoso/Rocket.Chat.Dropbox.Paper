import {
    IConfigurationExtend,
    IEnvironmentRead,
} from '@rocket.chat/apps-ts-definition/accessors';

import { App } from '@rocket.chat/apps-ts-definition/App';

import { DropboxPaperCreateCommand } from './DropboxPaperCreateCommand';

export class DropboxPaperApp extends App {
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(new DropboxPaperCreateCommand());
    }
}
