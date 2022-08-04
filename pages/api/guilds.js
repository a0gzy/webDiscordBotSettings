import { getCookie } from "cookies-next"
import {getData, getUser,getUserGuilds, getUserGuildsCookies} from "../../utils/DiscordUtils"

export default async function handler(req, res) {

    const userGuilds2 = await getUserGuilds(req,res)


    console.log("api/guilds")
   // console.log(userGuilds2)
   res.status(200).json(userGuilds2)
   // res.send(userGuilds2)
    //res.send(JSON.stringify(userGuilds2, null, 2))
}