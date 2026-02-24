"use client";
import Image from "next/image";
import { LoginForm } from "@/components/forms/loginForm";

export default function Home() {

  return (   
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-10 container mx-auto">
        <div className="col-start-auto flex justify-center flex-col">
          <Image
            src="/af.png"
            alt="Afternoon"
            width={400}
            height={400}
            className="mx-auto"
          />        
        </div>
        <div className="col-start-auto p-8">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Good Afternoon!</h1>
            <LoginForm/>
          </div>                
        </div>
      </div>
    </div>
  );
}