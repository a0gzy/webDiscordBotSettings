import { getGuild, getGuildChannels } from "../../../utils/DiscordUtils"


export default async function handler(req, res) {
    const { id } = req.query
   // console.log(id)
    const guildData = await getGuild(id)
    //const guildChannels = await getGuildChannels(id,req,res)

    res.status(200).json(guildData)
    //res.status(200).json(guildData || null)
}