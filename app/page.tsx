"use client";
import { useState } from "react";
import Image from "next/image";
import { Login } from "@/components/forms/login";

export default function Home() {
  const [isSignup, setIsSignup] = useState(true);

  return (   
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <div className="grid grid-cols-2 gap-10 container mx-auto">
        <div className="col-start-auto">
          <Image
            src="/af.png"
            alt="Afternoon"
            width={400}
            height={400}
            className="mb-6 mx-auto"
          />        
        </div>
        <div className="col-start-auto p-8">
          
            <Login />
          
        </div>
          
      </div>
    </div>
  );
}
