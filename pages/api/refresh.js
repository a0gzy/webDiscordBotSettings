import {getData, refreshData, refreshDataToken} from "../../utils/DiscordUtils"

export default async function handler(req, res) {
    const data = await getData(req,res)
    //const user = await getUser(req,res)
    console.log(data)
    //const ndata = await refreshDataToken(data?.refresh_token)
    const tdata = await refreshData(data?.refresh_token,req,res)
    console.log(tdata)

    res.send(JSON.stringify(tdata, null, 2))
  }