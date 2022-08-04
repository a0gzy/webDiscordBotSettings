import Link from 'next/link';
import { useRouter } from 'next/router'
import Scrollbar from 'react-scrollbars-custom';
import { getChannelMessages, getGuild, getGuildChannels } from '../../utils/DiscordUtils';

const Post = ({ id, guildData,guildChannels,channel,channelData }) => {

  //console.log(guildData)
  console.log("guildChannels")
  let test = guildChannels
  // let arr = new Array();
  // for(let i = 0;i<Object.keys(guildData).length;i++){
  //   arr.push(Object.keys(guildData)[i] + ": " + Object.values(guildData)[i])
  // }
  //console.log(test)

  return (
    <div className="w-full inline-flex">
      <div className="w-[30%] md:w-[20%] h-screen bg-[#36393e] rounded-l-3xl flex">
        <div className="flex-col flex">
          
          <div className="w-full p-1 flex justify-center m-1">
            <p className="m-auto text-cyan-300 hover:text-cyan-500 font-bold text-xl w-full hover:shadow-lg break-words md:flex md:justify-center">
              {guildData.name}
            </p>
          </div>

          <div className="w-full m-1 flex flex-col">
            {guildChannels?.map((item) => {
              //console.log(item)
              if (item.type === 0) {
                return (
                  <div
                    key={item.id}
                    className={
                      channel == item.id
                        ? "rounded-md m-1 bg-[#99AAB5] cursor-pointer"
                        : "bg-[#424549] rounded-md m-1 cursor-pointer hover:bg-[#99AAB5]"
                    }
                  >
                    <Link href={`/guilds/${id}?a=${item.id}`}>
                      <p className="ml-4 text-[#F6F6F6]"># {item.name}</p>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="w-[70%] md:w-[80%] bg-[#424549]">
        <div className="w-full flex flex-col h-screen">
            <Scrollbar >
              {channelData?.map((item) => {
                if (item.type === 0) {
                  return (
                    <div key={item.id} className="rounded-md m-2 bg-[#99AAB5]">
                      <p className="ml-4 text-[#F6F6F6]">{item.content}</p>
                    </div>
                  );
                }
              })}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};


export async function getServerSideProps(context) {
  // console.log(context)
  const req = context.req
  const res = context.res
  //console.log(res)


  const id = context.params.id;
  const channel = context.query.a || null
  //console.log(channel)
  const guildData = await getGuild(id)
  const guildChannels = await getGuildChannels(id)
  let channelData = null
  if(channel !== null){
    channelData = await getChannelMessages(channel)
  //  console.log(channelData)
  }
 // console.log(guildChannels)
  //console.log(guildData || 'ne nashlo')
  

  return { props: {id,guildData,guildChannels,channel,channelData} };
}

export default Post