"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const supabase = createClient();
  const [error, setError] = useState('');
  const router = useRouter();

  async function userLogin(e: React.FormEvent<HTMLFormElement>) {        
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    const {data, error} = await supabase.auth.signInWithPassword({    
      email: email!,
      password: password!,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push(redirectTo ?? "/test");
    }
  }

  return (
    <>
      <Button className="flex items-center justify-center gap-2 w-full mb-3" disabled> 
        <img src="/apple.svg" alt="Apple logo" className="w-5 h-5"/>
          Sign In with Apple
      </Button>
      <Button className="flex items-center justify-center gap-2 w-full mb-3" disabled> 
        <img src="/google.svg" alt="Google logo" className="w-5 h-5"/>
          Sign In with Google
      </Button>
      <Button className="flex items-center justify-center gap-2 w-full mb-3" disabled> 
        <img src="/discord.svg" alt="Discord logo" className="w-5 h-5"/>
          Sign In with Discord
      </Button>
      <div className="flex items-center my-4">
        <hr className="grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500">or</span>
        <hr className="grow border-t border-gray-300" />
      </div>
      <form onSubmit={userLogin} className="w-full">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="email@mail.com" required />
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="password" required />
        <Link href="/auth/forgot-password" className="text-sm text-right block relative -top-2.5">Forgot Password?</Link>
        <Button type="submit" className="w-full mt-4">Login</Button>
        { error && <div className='error mt-2.5 text-center text-red-500'>{error}</div> }
      </form>
      <Link href="/auth/signup" className="text-center mt-10 block">Need an account? <span className="underline">Sign Up</span></Link>
    </>
  )
}