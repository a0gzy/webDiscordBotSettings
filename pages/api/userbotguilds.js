import { getBotGuilds, getUserGuilds } from "../../utils/DiscordUtils"


export default async function handler(req, res) {

    const botGuilds = await getBotGuilds()
    const userGuilds = await getUserGuilds(req,res)

    let userBot = []

    for(let i =0;i<botGuilds.length;i++){
        for(let k =0;k<userGuilds.length;k++){
            if(botGuilds[i].id === userGuilds[k].id){
                let data = {}
                data.id = botGuilds[i].id
                data.icon =`https://cdn.discordapp.com/icons/${botGuilds[i].id}/${botGuilds[i].icon}` 
                data.name = botGuilds[i].name
                userBot.push( data)
            }
        }
    }

    console.log("api/userbotguilds")
    //console.log(userBot)

   res.status(200).json(userBot)
}