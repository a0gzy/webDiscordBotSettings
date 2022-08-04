import {getUser} from "../../utils/DiscordUtils"

export default async function handler(req, res) {
    const userData = await getUser(req,res)
    
    res.send(JSON.stringify(userData, null, 2))
}