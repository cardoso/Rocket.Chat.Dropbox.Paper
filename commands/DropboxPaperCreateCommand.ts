import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-ts-definition/accessors';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-ts-definition/slashcommands';

import { DropboxPaperApp } from '../DropboxPaperApp';
import { sharePaper } from '../lib/SharePaper';

export class DropboxPaperCreateCommand implements ISlashCommand {
    public command = 'dropbox-paper-create';
    public i18nParamsExample = 'DropboxPaperCreate_Command_Example';
    public i18nDescription = 'DropboxPaperCreate_Command_Description';
    public providesPreview = false;

    constructor(private readonly app: DropboxPaperApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const title = context.getArguments().slice().join(' ');

        const arg = {
            import_format: 'plain_text',
        };

        this.app.getLogger().log(arg);

        const result = await http.post(`https://api.dropboxapi.com/2/paper/docs/create?arg=${JSON.stringify(arg)}`, {
            content: title,
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });

        await sharePaper({id: result.data.doc_id, name: title}, context, read, modify);
    }
}
