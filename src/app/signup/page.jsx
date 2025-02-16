"use client"
import Image from 'next/image';
import React from 'react';
import Dubai from "../../../public/assets/dubai.jpg"
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Navbar from '@/components/navbar/Navbar';

const Signup = () => {
  return (
    <div className="relative h-screen w-full">
      <Navbar />
      <div className="relative h-full w-full">
        <Image 
          src={Dubai}
          className='brightness-50 h-full w-full object-cover'
        />
        <div className="h-[450px] w-[400px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <h2 className="text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500">
            Create an account
          </h2>
          <form className="mt-12 flex flex-col items-center w-full gap-8">
            <Input
              className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"
              type="text"
              placeholder="John123"
            />
              <Input
              className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"
              type="email"
              placeholder="johndoe@gmail.com"
            />
              <Input
              className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600"
              type="password"
              placeholder="******"
            />
            <Button
              className="w-3/4 mt-12 mx-auto cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600"
              label="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
