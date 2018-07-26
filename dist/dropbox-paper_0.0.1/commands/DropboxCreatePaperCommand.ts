import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-ts-definition/accessors';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-ts-definition/slashcommands';

import { DropboxPaperApp } from '../DropboxPaperApp';

export class DropboxCreatePaperCommand implements ISlashCommand {
    public command: string;
    public i18nParamsExample: string;
    public i18nDescription: string;
    public providesPreview: boolean;

    constructor(private readonly app: DropboxPaperApp) {
        this.command = 'dropbox-create-paper';
        this.i18nParamsExample = '';
        this.i18nDescription = 'DropBoxCreatePaper_Command_Description';
        this.providesPreview = true;
    }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        this.app.getLogger().log('Olá do DropBoxCreatePaperCommand');
    }
}