import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import {
    ISlashCommand,
    ISlashCommandPreview,
    ISlashCommandPreviewItem,
    SlashCommandContext,
    SlashCommandPreviewItemType,
} from '@rocket.chat/apps-engine/definition/slashcommands';

import { DropboxPaperApp } from '../DropboxPaperApp';
import { sharePaper } from '../lib/SharePaper';

export class DropboxPaperSearchCommand implements ISlashCommand {
    public command = 'dropbox-paper-search';
    public i18nParamsExample = 'DropboxPaperSearch_Command_Example';
    public i18nDescription = 'DropboxPaperSearch_Command_Description';
    public providesPreview = true;

    constructor(private readonly app: DropboxPaperApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        return;
    }

    public async previewer(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<ISlashCommandPreview> {
        const result = await http.post('https://api.dropboxapi.com/2/paper/docs/search', {
            data: {
                query: context.getArguments().slice().join(' '),
                limit: 10,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            i18nTitle: 'DropboxPaperSearch_Command_Preview',
            items: result.data.docs.map((doc) => {
                return {
                    id: doc.doc_id,
                    type: SlashCommandPreviewItemType.TEXT,
                    value: doc.title,
                };
            }),
        };
    }

    /** The function which gets executed whenever a user selects a preview item. */
    // tslint:disable-next-line:max-line-length
    public async executePreviewItem(item: ISlashCommandPreviewItem, context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        await sharePaper({id: item.id, name: item.value}, context, read, modify);
    }

    /*
    This is an implementation with the list API (can sort, but can't query)
    public async previewer(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<ISlashCommandPreview> {
        const result = await http.post('https://api.dropboxapi.com/2/paper/docs/list', {
            data: {
                filter_by: 'docs_created',
                sort_by: 'modified',
                sort_order: 'descending',
                limit: 10
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const results = result.data.doc_ids.map(doc_id => {
            return http.post('https://api.dropboxapi.com/2/paper/docs/get_metadata', {
                data: {
                    doc_id: doc_id
                }
            })
        })

        return new Promise<ISlashCommandPreview>((resolve, reject) => {
            Promise.all(results).then(results => {
                resolve({
                    i18nTitle: 'Dropbox_Paper_Preview_Title',
                    items: results.map(result => (result as any).data).map(metadata => {
                        return {
                            id: metadata.doc_id,
                            type: SlashCommandPreviewItemType.TEXT,
                            value: metadata.title
                        }
                    })
                })
            })
        })
    }
    */
}
