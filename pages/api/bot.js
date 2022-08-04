import { getBot } from "../../utils/DiscordUtils"


export default async function handler(req, res) {

    const bot = await getBot()

 //   console.log("api/guilds")

   res.status(200).json(bot)
}