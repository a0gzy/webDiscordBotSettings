import { getBotGuilds } from "../../utils/DiscordUtils"


export default async function handler(req, res) {

    const botGuilds = await getBotGuilds()

 //   console.log("api/guilds")

   res.status(200).json(botGuilds)
}