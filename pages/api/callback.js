import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import {getFirstToken,getToken,getUser,saveData, saveUserData} from "../../utils/DiscordUtils"

export default async function handler(req, res) {
    const code = req?.query.code
   
    let oauthData = await getFirstToken(code, req, res)

    const userData = await getUser();
    saveUserData(userData,req,res)
 
    res.redirect("/dash")
}


// export default async function handler(req, res) {
//     setCookie('server-key', 'value', { req, res, maxAge: 60 * 60 * 24 });
//     getCookie('key', { req, res });
//     getCookies({ req, res });
//     deleteCookie('key', { req, res });
  
//     return res.status(200).json({ message: 'ok' });
//   }