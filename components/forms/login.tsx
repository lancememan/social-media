"use client";
import Form from "next/form";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


export function Login(redirectTo: string) {
  const supabase = createClient();
  const [error, setError] = useState('');

  async function userLogin(formData: FormData) {    

    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    const {data, error} = await supabase.auth.signInWithPassword({    
      email: email!,
      password: password!,
    });
    if (error) {
      console.error('Error logging in:', error);
      setError(error.message);
    } else {
      if(redirectTo === undefined) {
        redirect('/');
      } else {
        redirect(redirectTo);
      }
    }
  }

  return (
      <Form action={userLogin} className="max-w-100">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="email@mail.com" required />
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="password" required />
        <Link href="/auth/forgot-password" className="text-sm text-right block relative -top-2.5">Forgot Password?</Link>
        <Button type="submit" className="w-full mt-4">Login</Button>
        { error && <div className='error mt-2.5 text-center text-red-500'>{error}</div> }
      </Form>
  )
}