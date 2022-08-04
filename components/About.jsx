import React from 'react'

export const About = () => {
  return (
    <div id="about" className="w-full h-full flex justify-start bg-[#282b30]">
      <div className='w-[20%] h-screen bg-[#36393e] rounded-l-3xl flex justify-center'>
        <div className='w-full p-1'>
          <p className='m-auto text-cyan-300 hover:text-cyan-500 font-bold text-xl w-full hover:shadow-lg break-words md:flex md:justify-center'>HYK x NOIR Dashboard</p>
        </div>
      </div>
      <div className='w-[80%] bg-[#424549]'></div>
    </div>
  );
}

export default About