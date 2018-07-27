import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-ts-definition/accessors';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-ts-definition/slashcommands';

import { DropboxPaperApp } from '../DropboxPaperApp';

export class DropboxPaperCreateCommand implements ISlashCommand {
    public command = 'dropbox-paper-create';
    public i18nParamsExample = 'DropboxPaperCreate_Command_Example';
    public i18nDescription = 'DropboxPaperCreate_Command_Description';
    public providesPreview = false

    constructor(private readonly app: DropboxPaperApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const title = context.getArguments().slice().join(' ');

        const arg = { 
            import_format: 'plain_text'
        }

        this.app.getLogger().log(arg);

        const result = await http.post(`https://api.dropboxapi.com/2/paper/docs/create?arg=${JSON.stringify(arg)}`, { 
            content: title
        });

        const botUsername = await read.getEnvironmentReader().getSettings().getValueById('Dropbox_Paper_Bot');
        const botUser = await read.getUserReader().getByUsername(botUsername);

        const builder = modify.getCreator().startMessage()
            .setSender(botUser || context.getSender())
            .setRoom(context.getRoom())
            .setUsernameAlias('Dropbox Paper')
            .setAvatarUrl('https://cardo.so/Rocket.Chat.Dropbox.Paper/icon.png')
            .setText(`@${context.getSender().username} shared a new paper: [${result.data.title || 'Untitled'}](https://paper.dropbox.com/doc/${result.data.doc_id})`);

        await modify.getCreator().finish(builder);
    }
}
