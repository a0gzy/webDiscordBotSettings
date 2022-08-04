import React from 'react'
import Link from 'next/link';

const LoginButton = () => {

    return (
        <div className="bg-slate-300 hover:drop-shadow rounded-xl w-20 cursor-pointer">
          <Link
            href={
              "https://discord.com/api/oauth2/authorize?client_id=945450005911732304&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback&response_type=code&scope=identify%20email%20guilds"
            }
          >
            <div className="p-2 flex justify-center">
              <a>Login</a>
            </div>
          </Link>
        </div>
      );
}

export default LoginButton