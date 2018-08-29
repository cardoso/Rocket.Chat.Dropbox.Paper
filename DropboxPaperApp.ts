import { App } from '@rocket.chat/apps-engine/definition/App';

import { IConfigurationExtend, IEnvironmentRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';

import { DropboxPaperCreateCommand } from './commands/DropboxPaperCreateCommand';
import { DropboxPaperSearchCommand } from './commands/DropboxPaperSearchCommand';

import { SettingToHttpHeader } from './handlers/SettingToHttpHeader';

export class DropboxPaperApp extends App {
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.settings.provideSetting({
            id: 'Dropbox_Paper_Bot',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Dropbox_Paper_Bot',
            i18nDescription: 'Dropbox_Paper_Bot_Description',
        });

        await configuration.settings.provideSetting({
            id: 'Dropbox_Paper_Api_Token',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Dropbox_Paper_Api_Token',
            i18nDescription: 'Dropbox_Paper_Api_Token_Description',
        });

        configuration.http.providePreRequestHandler(new SettingToHttpHeader('Dropbox_Paper_Api_Token', 'Authorization'));

        await configuration.slashCommands.provideSlashCommand(new DropboxPaperCreateCommand(this));
        await configuration.slashCommands.provideSlashCommand(new DropboxPaperSearchCommand(this));
    }
}
