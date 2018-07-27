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

        /*if(title) {
            const arg = {
                doc_id: result.data.doc_id,
                doc_update_policy: 'overwrite_all',
                revision: 0
            }

            await http.post(`https://api.dropboxapi.com/2/paper/docs/update?arg=${JSON.stringify(arg)}`)
        }*/

        this.app.getLogger().log('Dropbox:');
        this.app.getLogger().log(result.data);

        const api = read.getEnvironmentReader().getSettings().getValueById('Dropbox_Paper_Api_Token')

        const builder = modify.getCreator().startMessage()
            .setSender(context.getSender()).setRoom(context.getRoom())
            .setText(`I'm sharing a Dropbox Paper file: https://paper.dropbox.com/doc/${result.data.doc_id}`);

        await modify.getCreator().finish(builder);
    }
}
