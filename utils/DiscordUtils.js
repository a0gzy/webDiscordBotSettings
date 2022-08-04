import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

let currentGuilds = new Object();

async function  getData (req, res) {
  if (getCookie("accessData", { req, res })) {
    const data = JSON.parse(getCookie("accessData", { req, res }));

    //  console.log(data);
    //  console.log("getData");

    return data;
  }
  console.log('getdata nuuuul');
  return ;
};

async function getToken(req,res) {
    let data = await getData(req,res)
    if(!data) return
    // console.log(data)
    // console.log("сверху токен")

    if(new Date(data.expiresAt) <= new Date().getTime()) {

        //  console.log("меняем токен - прошлый:")
        //  console.log(data.access_token)
        //  console.log("меняем токен - прошлый рефреш:")
        //  console.log(data.refresh_token)
        

       const newData = await refreshData(data.refresh_token,req,res)
        //  console.log("поменяли дата")
        //  console.log(data)
        // if(newData)
        if(newData.access_token){

            const refreshedToken = newData.access_token

        return refreshedToken
        }
        else{
            deleteCookie('accessData',{req,res})
            deleteCookie('userData',{req,res})
            console.log("error delete cookies")
            return
        }

        
    }
  
    
    let token = data.access_token;
    return token
}


async function getFirstToken(code,req,res) {
    
    if (!code) return

    let oauthResult  = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: "http://localhost:3000/api/callback",
            scope: 'identify',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })

    const oauthData = await oauthResult.json();

    const expiresAt = oauthData.expires_in + new Date().getTime()
    oauthData.expiresAt = expiresAt;

    saveData(oauthData,req,res)

    //setCookie('accessData', oauthData, { req, res });

  //  saveData(oauthData,req,res)
    // console.log(getCookie("accessData", { req, res }))
    // console.log("saved")

    return oauthData
}

async function refreshData(token,req,res) {
    console.log("refreshDataOldToken")
    console.log(token)
    console.log(typeof token)
    if (!{token}) {
        deleteCookie('accessData', { req, res })
        console.log("удаляем токен")
        return
    }

  //  console.log("меняемToken")

    let oauthResult  = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: token
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })

    const oauthData = await oauthResult.json();
    //console.log(oauthData)

    if(oauthData.error) {
        deleteCookie('accessData', { req, res })
        console.log("error delete accessData cookie")
        console.log(oauthData.error)
        return
    }

    await saveData(oauthData,req,res)

    //console.log(oauthData)
    console.log("refresh TOKEN")

    return oauthData
}

async function refreshTokenCli(data) {
    if(!data) return
    // CLIENTSIDE
    const token = JSON.parse( data)?.refresh_token
    
    let oauthResult  = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: "945450005911732304",
            client_secret: "tpy33kUSlCI9MVG7OrCHgL3PSeukMXOC",
            grant_type: 'refresh_token',
            refresh_token: token
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })

    let oauthData = await oauthResult.json();
    //console.log(oauthData)

    if(oauthData.error) {
        deleteCookie('accessData')
        console.log("error delete accessData cookie")
        return
    }

    const expiresAt = oauthData.expires_in + new Date().getTime()
    oauthData.expiresAt = expiresAt;

    setCookie('accessData', oauthData,{maxAge: 2147483647});

  //  console.log(oauthData)
    console.log("refresh TOKEN")

    return oauthData
}


async function getUser(req,res) {
    const ud = getCookie('userData',{req,res})
    //console.log(ud)
    if(ud){
        return JSON.parse(ud)
    }
    const token = await getToken(req,res)
    if (!token) return
    let userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: "Bearer " + token
        }
    })
    userResult = await userResult.json()
    userResult.avaUrl = "https://cdn.discordapp.com/avatars/" + userResult.id + "/" + userResult.avatar

    saveUserData(userResult,req,res)

    return userResult
}

async function getUserGuilds(req,res) {
    const token = await getToken(req,res)

    const user = getUser(req,res)
 //   console.log("userGuilds token")
   // console.log(token)
    
    if (!token) return
    if(Object.entries(currentGuilds).length !== 0){
       // console.log(currentGuilds)
        if(currentGuilds[0]?.name){
            return currentGuilds
        }

        //With multiple users TODO
    }

    //console.log(currentGuilds)
   // console.log(typeof currentGuilds)

    let userGuilds = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: "Bearer " + token
        }
    })
    //console.log(userGuilds.body)
    const userGuildsJ = await userGuilds.json()

    //console.log(typeof userGuildsJ)
    currentGuilds = userGuildsJ;
   // console.log(currentGuilds)

   // console.log(userGuildsJ)
   // console.log("userGuildsJ")

  // setCookie('userGuilds', userGuildsJ, { req, res });
  // console.log("setCookie")
  // console.log(getCookie('userGuilds',{ req, res }))

   return userGuildsJ
}

async function getUserGuildsLittle(req,res){

    const userGuilds = await getUserGuilds(req,res)
    //console.log(userGuilds)

    let guilds = new Array()
  
    for (let i = 0; i < userGuilds?.length; i++) { 
        let guildNames = {}
        guildNames.id = userGuilds[i].id
        guildNames.name = userGuilds[i].name
        guildNames.icon = userGuilds[i].icon

        guilds.push(guildNames)
    }


    return guilds
}

async function saveData(data,req, res) {
    
    let oauthData = data

    const expiresAt = oauthData.expires_in + new Date().getTime()
    oauthData.expiresAt = expiresAt;

    setCookie('accessData', oauthData, { req, res ,maxAge: 2147483647});
}

async function saveUserData(data,req,res) {
    setCookie('userData', data,{req,res,maxAge: 2147483647});
}









//              BOT FETCHES


async function getGuild(guildId) {
   // console.log(guildId)
    const token = `OTQ1NDUwMDA1OTExNzMyMzA0.GoSAu7.AY0kvGuFf7VWfujclc420H7xbg3NA2zQk3YqKU`
    if (!token) return
   // console.log(token)
    let result = await fetch(`https://discord.com/api/guilds/${guildId}`, {
       // withCredentials: true,
      //  credentials: 'include',
        headers: {
            authorization: `Bot ${token}`
        }
    })
    //console.log(result.headers)
    result = await result.json()

    return result
}

async function getBot() {
    // console.log(guildId)
     const token = `OTQ1NDUwMDA1OTExNzMyMzA0.GoSAu7.AY0kvGuFf7VWfujclc420H7xbg3NA2zQk3YqKU`
    // console.log(token)
     let result = await fetch(`https://discord.com/api/users/@me`, {
        // withCredentials: true,
       //  credentials: 'include',
         headers: {
             authorization: `Bot ${token}`
         }
     })
     //console.log(result.headers)
     result = await result.json()
 
     return result
 }


async function getBotGuilds() {
    // console.log(guildId)
     const token = `OTQ1NDUwMDA1OTExNzMyMzA0.GoSAu7.AY0kvGuFf7VWfujclc420H7xbg3NA2zQk3YqKU`
    // console.log(token)
     let result = await fetch(`https://discord.com/api/users/@me/guilds`, {
        // withCredentials: true,
       //  credentials: 'include',
         headers: {
             authorization: `Bot ${token}`
         }
     })
     //console.log(result.headers)
     result = await result.json()
 
     return result
 }

async function getGuildChannels(guildId) {
    // console.log(guildId)
    const token = `OTQ1NDUwMDA1OTExNzMyMzA0.GoSAu7.AY0kvGuFf7VWfujclc420H7xbg3NA2zQk3YqKU`
    // console.log(token)
     let result = await fetch(`https://discord.com/api/guilds/${guildId}/channels`, {
        method: 'GET',
        headers: {
            authorization: `Bot ${token}`
         },
     })
    // console.log(result)
     result = await result.json()
 
     return result
 }

 async function getChannelMessages(channelId) {
    // console.log(guildId)
    const token = `OTQ1NDUwMDA1OTExNzMyMzA0.GoSAu7.AY0kvGuFf7VWfujclc420H7xbg3NA2zQk3YqKU`
    // console.log(token)
     let result = await fetch(`https://discord.com/api/channels/${channelId}/messages`, {
        method: 'GET',
        headers: {
            authorization: `Bot ${token}`
         },
     })
    // console.log(result)
     result = await result.json()
 
     return result
 }





export {getData,getToken ,getUser ,getUserGuilds ,getFirstToken,saveData,saveUserData,refreshData,refreshTokenCli,getGuild,getGuildChannels,getBot,getBotGuilds,getChannelMessages, }