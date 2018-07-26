import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-ts-definition/accessors';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-ts-definition/slashcommands';

import { DropboxPaperApp } from './DropboxPaperApp';

export class DropboxPaperCreateCommand implements ISlashCommand {
    public command = 'dropbox-create-paper';
    public i18nParamsExample = 'DropboxPaperCreate_Command_Example';
    public i18nDescription = 'DropboxPaperCreate_Command_Description';
    public providesPreview = false

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const builder = modify.getCreator().startMessage()
            .setSender(context.getSender()).setRoom(context.getRoom())
            .setText('༼ つ ◕_◕ ༽つ ' + context.getArguments().join(' '));

        await modify.getCreator().finish(builder);
    }
}
