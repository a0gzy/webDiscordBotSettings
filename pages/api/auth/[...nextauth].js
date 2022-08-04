import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
            scope: 'identify email guilds'
        }
      },
      
      userinfo: "https://discord.com/api/users/@me", 
    }),
    // ...add more providers here

  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      
      user && (token.user = user)
      return token
  },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      
      session.accessToken = token.accessToken

      return session
    },
  }
})