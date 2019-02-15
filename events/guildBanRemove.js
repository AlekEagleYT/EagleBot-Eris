'use strict';

module.exports = {
    name: 'guildBanRemove',

    exec: (client, g, u) => {
        var admin = ''
        g.channels.find(c => c.name === "warnings-and-bans").sendTyping()
        setTimeout(() => {
            if (g.id === '400304296119500811' || g.id === '457189090786410507') {
                client.guilds.get(g.id).getAuditLogs(1).then(logs => {
                    if (g.members.get(logs.users[0].id)) {
                        admin = g.members.get(logs.users[0].id)
                    }else {
                        admin = g.members.get(logs.users[1].id)
                    }
                    g.channels.find(c => c.name === "warnings-and-bans").createMessage({
                        embed: {
                            author: {
                                name: `${admin.username}#${admin.discriminator}`,
                                icon_url:  client.users.get(admin.id).avatarURL ? client.users.get(admin.id).avatarURL : 'https://cdn.discordapp.com/embed/avatars/0.png'
                            },
                            title: 'New Unban',
                            color: 65280,
                            footer: {
                                icon_url: client.users.get(u.id).avatarURL ? client.users.get(u.id).avatarURL : 'https://cdn.discordapp.com/embed/avatars/0.png',
                                text: `Unbanned ${u.username}#${u.discriminator}`
                            },
                            fields: [
                                {
                                    name: `User / Bot`,
                                    value: `${u.username}#${u.discriminator}`,
                                    inline: true
                                },
                                {
                                    name: 'Moderator / Admin',
                                    value: `${admin.username}#${admin.discriminator}`,
                                    inline: true
                                },
                                {
                                    name: 'Reason',
                                    value: `${logs.entries[0].reason ? logs.entries[0].reason : 'No Reason'}`
                                }
                            ]
                        }
                    });
                });
            }
        }, 1000)
    }
}