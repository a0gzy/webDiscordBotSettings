import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    const session = await getSession({ req })
    res.send(JSON.stringify(session, null, 2))
  }