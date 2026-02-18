"use client";
import Form from "next/form";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

function ForgotPassword() {
  const supabase = createClient();
  const [error, setError] = useState('');

  async function userForgotPassword(formData: FormData) {    
    const email = formData.get('email')?.toString();

    const {data, error} = await supabase.auth.resetPasswordForEmail(email!);

    if (error) {
      console.error('Error resetting password:', error);
      setError(error.message);
    }
    }

  return (
      <Form action={userForgotPassword} className="max-w-100">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 sr-only">Email</label>
        <input name="email" type="email" placeholder="Email" id="email" className="mb-5 p-1.5 w-full rounded-sm bg-amber-50 placeholder-blue-400 outline-blue-600 text-blue-600"/>
        <button type="submit" className="button bg-blue-600 cursor-pointer py-2 px-8 rounded mx-auto block">Reset Password</button>
        { error && <div className='error mt-2.5 text-center text-red-500'>{error}</div> }
      </Form>
  )
}

export default ForgotPassword