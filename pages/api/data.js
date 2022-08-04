import {getData, getUser} from "../../utils/DiscordUtils"

export default async function handler(req, res) {
    const data = await getData(req,res)
    console.log(data)

    if(!data) res.send(JSON.stringify({}, null, 2))
    //const user = await getUser(req,res)
   // console.log(data)
    let rdata = data
    rdata.timen = new Date().getTime()

    const ist = new Date(rdata.expiresAt) <= new Date().getTime() ? "<=" : ">"
    rdata.ist = ist;

    rdata.expireDate = new Date(rdata.expiresAt)
    rdata.nowDate = new Date()

    //rdata.user = user

    res.send(JSON.stringify(rdata, null, 2))
  }