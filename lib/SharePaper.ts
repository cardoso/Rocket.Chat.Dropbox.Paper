import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export async function sharePaper(paper: {id: string, name: string}, context: SlashCommandContext, read: IRead, modify: IModify): Promise<void> {
    const botUsername = await read.getEnvironmentReader().getSettings().getValueById('Dropbox_Paper_Bot');
    const botUser = await read.getUserReader().getByUsername(botUsername);

    const builder = modify.getCreator().startMessage()
        .setSender(botUser || context.getSender())
        .setRoom(context.getRoom())
        .setUsernameAlias('Dropbox Paper')
        .setAvatarUrl('https://cardo.so/Rocket.Chat.Dropbox.Paper/icon.png')
        .setText(`@${context.getSender().username} shared a paper: <https://paper.dropbox.com/doc/${paper.id}|${paper.name || 'Untitled'}>`);

    await modify.getCreator().finish(builder);
}
